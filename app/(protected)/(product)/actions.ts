"use server";
import { auth } from "@/auth";
import {
  NewOrder,
  NewOrderItem,
  Order,
  OrderItem,
  OrderStatus,
} from "@/lib/data-model/schema-definitions";
import { CreateOrder } from "@/schema/form-schema";
import { sql } from "@vercel/postgres";

async function ValidateUser() {
  const session = await auth();
  if (!session?.user.id) return { message: "User not authorized." };
  return session.user.id;
}

//TODO NOTE: implement transaction for data integrity
export async function createOrderDraft(
  order: Order | NewOrder,
  orderItems: OrderItem[] | NewOrderItem[]
) {
  const validatedFields = CreateOrder.safeParse({
    order_name: order.order_name,
    billing_info_id: order.billing_data,
    shipping_info: order.shipping_data,
    status: order.status,
  });

  const date_created = new Date().toISOString().split("T")[0];
  const { order_name, status } = order;

  const user_id = (await ValidateUser()) as string;

  let orderId: string | null = null;
  try {
    // Insert the order and return the generated id
    const queryResult = await sql<{ id: string }>`
        INSERT INTO orders (user_id, order_name, status, date_created)
        VALUES (${user_id}, ${order_name}, ${status}, ${date_created})
        RETURNING id
      `;
    // console.log("xxxxxxxxx Order inserted xxxxxxxxx");
    // console.log(queryResult);
    orderId = queryResult.rows[0].id; // Assuming the id is returned as the first element
    // console.log(orderId);
    // Insert each order item using the orderId
    for (const item of orderItems) {
      const { product_type_id, product_config, note, quantity } = item;
      const stringifiedProductConfig = JSON.stringify(product_config);
      await sql`
          INSERT INTO order_items (order_id, product_type_id, product_config, note, quantity)
          VALUES (${orderId}, ${product_type_id}, ${stringifiedProductConfig}, ${note}, ${quantity})
        `;
    }

    return { message: "Order and Order Items created successfully." };
  } catch (error) {
    console.error(error);

    // Attempt to manually roll back by deleting the order if it was created
    if (orderId) {
      await sql`
          DELETE FROM orders WHERE id = ${orderId}
        `;
    }

    return {
      message:
        "Database Error: Failed to create Order and Order Items. Changes rolled back.",
    };
  }
}

export async function createOrder(order: NewOrder, orderItems: NewOrderItem[]) {
  const user_id = (await ValidateUser()) as string;

  const { order_name, billing_data, shipping_data } = order;

  //TODO NOTE: add data validation for order and order items
  const validatedFields = CreateOrder.safeParse({
    order_name: order_name,
    billing_data: billing_data,
    shipping_data: shipping_data,
  });

  const billing_data_string = JSON.stringify(billing_data);
  const shipping_data_string = JSON.stringify(shipping_data);

  const status = OrderStatus.Pending;

  const date_created = new Date().toISOString().split("T")[0];
  const date_submitted = new Date().toISOString().split("T")[0];

  let orderId: string | null = null;
  try {
    // Insert the order and return the generated id
    const queryResult = await sql<{ id: string }>`
        INSERT INTO orders (user_id, 
                            order_name, 
                            billing_data, 
                            shipping_data, 
                            status, 
                            date_created, 
                            date_submitted)
        VALUES (${user_id}, 
                ${order_name}, 
                ${billing_data_string}, 
                ${shipping_data_string}, 
                ${status}, 
                ${date_created}, 
                ${date_submitted})
        RETURNING id
      `;

    orderId = queryResult.rows[0].id;

    for (const item of orderItems) {
      const { product_type_id, product_config, note, quantity } = item;
      await sql`
          INSERT INTO order_items (order_id, product_type_id, product_config, note, quantity)
          VALUES (${orderId}, ${product_type_id}, ${product_config}, ${note}, ${quantity})
        `;
    }

    return {
      message: "Order and Order Items created successfully.",
      order_id: orderId,
    };
  } catch (error) {
    console.error(error);

    // Attempt to manually roll back by deleting the order if it was created
    if (orderId) {
      await sql`
          DELETE FROM orders WHERE id = ${orderId}
        `;
    }

    return {
      message:
        "Database Error: Failed to create Order and Order Items. Changes rolled back.",
    };
  }
}
