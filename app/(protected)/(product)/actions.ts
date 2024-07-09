"use server";

import { auth } from "@/auth";
import { Order, OrderItem } from "@/lib/definitions/order-definitions";
import { sql } from "@vercel/postgres";

//NOTE TODO: implement transaction for data integrity
export async function createOrderDraft(order: Order, orderItems: OrderItem[]) {
  const date_created = new Date().toISOString().split("T")[0];
  const { order_name, status } = order;
  let orderId: string | null = null;

  const session = await auth();
  if (!session?.user.id) return { message: "User not authorized." };

  try {
    // Insert the order and return the generated id
    const queryResult = await sql<{ id: string }>`
        INSERT INTO orders (user_id, order_name, status, date_created)
        VALUES (${session.user.id}, ${order_name}, ${status}, ${date_created})
        RETURNING id
      `;
    // console.log("xxxxxxxxx Order inserted xxxxxxxxx");
    // console.log(queryResult);
    // orderId = queryResult.rows[0].id; // Assuming the id is returned as the first element
    // console.log(orderId);
    // Insert each order item using the orderId
    for (const item of orderItems) {
      const {
        glassType,
        shape,
        dimensions,
        thickness,
        tint,
        fabrication_options,
        misc_options,
        note,
        quantity,
      } = item;
      await sql`
          INSERT INTO order_items (order_id, glass_type, shape, dimensions, thickness, tint, fabrication_options, misc_options, note, quantity)
          VALUES (${orderId}, ${glassType}, ${shape}, ${dimensions}, ${thickness}, ${tint}, ${fabrication_options}, ${misc_options}, ${note}, ${quantity})
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
