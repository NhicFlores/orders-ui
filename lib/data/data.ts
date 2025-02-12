// DEPRECATED: these queries use the old data model and should be removed
// fetch functions
import { sql } from "@vercel/postgres";
import {
  CustomerField,
  OrderForm,
} from "@/lib/definitions/definitions";

// used in order/[id]/edit/page.tsx 
export async function fetchOrderById(id: string) {
  // RESEARCH NOTE: check the need for noStore on this function
  try {
    const data = await sql<OrderForm>`
      SELECT 
        orders.id,
        orders.customer_id,
        orders.order_name,
        orders.product_id,
        orders.quantity, 
        orders.price,
        orders.status
      FROM orders
      WHERE orders.id = ${id};
    `;

    const order = data.rows.map((order) => ({
      ...order,
      //convert from cents to dollars
      price: order.price / 100,
    }));
    return order[0];
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch order");
  }
}

export async function fetchCustomers() {
  //noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    //const customers = data.rows;
    const customers: CustomerField[] = [{ id: "1", name: "Fetched Customer" }];
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}
