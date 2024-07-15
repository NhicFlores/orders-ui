"use server";

import { OrderDB, OrderStatus } from "@/lib/definitions/order-definitions";
import { sql } from "@vercel/postgres";

export async function fetchOrdersByStatus(status: OrderStatus) {
  try {
    const data = await sql<OrderDB>`
            SELECT * FROM orders
            WHERE status = ${status}
        `;
    //2024-07-09T05:00:00.000Z
    //2024-05-01T05:00:00.000Z
    console.log(data.rows);
    return data.rowCount > 0 ? data.rows : [];
  } catch (error) {
    throw new Error("Database Error: Failed to fetch draft orders");
  }
}

export async function fetchOrders() {
  try {
    const data = await sql<OrderDB>`
            SELECT * FROM orders
            WHERE status != ${OrderStatus.Draft} AND status != ${OrderStatus.Quote}
        `;
    console.log(data.rows);
    return data.rowCount > 0 ? data.rows : [];
  } catch (error) {
    throw new Error("Database Error: Failed to fetch orders");
  }
}
