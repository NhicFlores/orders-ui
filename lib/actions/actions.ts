"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OrderRoute } from "@/routes";
import { Order, TestOrder } from "../definitions/order-definitions";

//updating the data displayed in the orders route,
//so we need to clear this cache and trigger a new request to the server
// import revalidateData
//NOTE TODO array of enum values
//(Object.values(OrderStatus) as string[])
// const StatusArr = Object.values(OrderStatus).map((statusArr) => {
//         //statusArr.
//     });

const OrderFormSchema = z.object({
  id: z.string(),
  customer_id: z.string({
    invalid_type_error: "Please select a customer.",
  }),//.regex(/^[0-9]+$/, { message: "Please select a customer." })
  order_name: z.string({
    invalid_type_error: "Please enter an order name.",
  }),
  product_id: z.string({
    invalid_type_error: "Please enter a product ID.",
  }), //NOTE TODO: how am i creating the product id - this will probably end up being a calculated value to provide readability
  // or create a UUID and provide an expandable summary/description for the order
  quantity: z.coerce
    .number()
    .gt(0, { message: "Please enter a quantity greater than 0." }),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter a price greater than 0." }),
  status: z.enum(["pending", "draft", "shipped", "processing", "quote"], {
    invalid_type_error: "Please select an order status.",
  }),
  date: z.string(),
});
const CreateOrder = OrderFormSchema.omit({ id: true, date: true });

/*
If you're working with forms that have many fields, 
you may want to consider using the entries() method 
with JavaScript's Object.fromEntries(). For example:

const rawFormData = Object.fromEntries(formData.entries())
*/

//this is temporary until @types/react-dom is updated
export type OrderFormState = {
  errors?: {
    customer_id?: string[];
    order_name?: string[];
    product_id?: string[];
    quantity?: string[];
    price?: string[];
    status?: string[];
  };
  message?: string | null;
};
// NOTE TODO: finish new order function
// export async function createNewOrder(order: NewOrder){
//   const date = new Date().toISOString().split("T")[0];
//   const { user_id, order_name, product_config, billing_info_id, shipping_info_id, status } = order;
//   const { glass_type, glass_shape, glass_dimensions, glass_thickness, glass_tint, glass_options } = product_config;

//   try {
//     await sql`
//         INSERT INTO orders (customer_id, order_name, product_config, billing_info_id, shipping_info_id, status, date)
//         VALUES (${user_id}, ${order_name}, ${glass_type, glass_shape, glass_dimensions, glass_thickness, glass_tint, glass_options}, ${status}, ${date})
//     `;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to create and Order.",
//     };
//   }
// }

// create overload to handle create from summary card
export async function createOrder(
  prevState: OrderFormState,
  formData: FormData
) {
  const rawFormData = {
    customer_id: formData.get("customer_id"),
    order_name: formData.get("order_name"),
    product_id: formData.get("product_id"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
    status: formData.get("status"),
  };

  console.log(rawFormData);

  const validatedFields = CreateOrder.safeParse({
    customer_id: formData.get("customer_id"),
    order_name: formData.get("order_name"),
    product_id: formData.get("product_id"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Order",
    };
  }

  const { customer_id, order_name, product_id, quantity, price, status } =
    validatedFields.data;
  //const priceInCents = price * 100; NOTE TO DO: check whether it is more efficient to store the DECIMAL(19,4) type in db or make the calculation here
  const date = new Date().toISOString().split("T")[0];
  //console.log(date);
  //const localDate = formatDateToLocal(date);//NOTE TO DO - this formatter was causing the day to be one day back: create on 05-01, saved as 04-30
  try {
    await sql`
        INSERT INTO orders (customer_id, order_name, product_id, quantity, price, status, date)
        VALUES (${customer_id}, ${order_name}, ${product_id}, ${quantity}, ${price}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to create and Order.",
    };
  }

  revalidatePath(OrderRoute.href);
  redirect(OrderRoute.href);
}

const UpdateOrder = OrderFormSchema.omit({ id: true, date: true });

export async function updateOrder(
  id: string,
  prevState: OrderFormState,
  formData: FormData
) {
  const validatedFields = UpdateOrder.safeParse({
    customer_id: formData.get("customer_id"),
    order_name: formData.get("order_name"),
    product_id: formData.get("product_id"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Order",
    };
  }

  const { customer_id, order_name, product_id, quantity, price, status } =
    validatedFields.data;
  const priceInCents = price * 100;

  try {
    await sql`
            UPDATE orders
            SET customer_id = ${customer_id}, order_name = ${order_name}, product_id = ${product_id}, quantity = ${quantity}, price = ${priceInCents}, status = ${status}
            WHERE id = ${id}
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to update Order",
    };
  }

  revalidatePath(OrderRoute.href);
  redirect(OrderRoute.href);
}

export async function deleteOrder(id: string) {
  //console.log("DELETED ORDER");

  await sql`
        DELETE FROM orders
        WHERE id = ${id}
    `;
  revalidatePath(OrderRoute.href);
}

// NOTE TEST FUNCTION
export async function createTestOrder(order: TestOrder) {
  console.log("-------------- CREATE TEST ORDER ACTION --------------");
  console.log(order);
  const date = new Date().toISOString().split("T")[0];
  const { order_name, order_items, status } = order;

  const order_items_string = JSON.stringify(order_items);
  //console.log(order_items_string);
  const someString = "test string";
  try {
    console.log("TRYING TO INSERT ORDER");
    await sql`
        INSERT INTO test_order (order_name, order_items, status)
        VALUES (${order_name}, ${order_items_string}, ${status})
    `;
    console.log("INSERTED ORDER");
  } catch (error) {
    return {
      message: "Database Error: Failed to create and Order.",
    };
  }
  //revalidatePath(OrderRoute.href);
  //redirect(OrderRoute.href);
}
