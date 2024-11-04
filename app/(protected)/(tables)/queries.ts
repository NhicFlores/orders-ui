"use server";
import { Order, OrderStatus } from "@/lib/definitions/data-model";
import { OrderTableData } from "./orders/columns";
import { db } from "@/drizzle/db";
import { OrderTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function fetchOrders() {
  try {
    const orders = await db
      .select({
        id: OrderTable.id,
        user_id: OrderTable.user_id,
        order_name: OrderTable.order_name,
        status: OrderTable.status,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        date_created: OrderTable.date_created,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
      })
      .from(OrderTable);
    //2024-07-09T05:00:00.000Z
    //2024-05-01T05:00:00.000Z
    // console.log(data.rows);
    // return data.rowCount && data.rowCount > 0 ? data.rows : [];
    return orders as Order[];
  } catch (error) {
    // return [];
    throw new Error("Database Error: Failed to fetch draft orders");
  }
}

export async function fetchOrdersByStatus(status: OrderStatus) {
  try {
    const data = await db
      .select({
        id: OrderTable.id,
        user_id: OrderTable.user_id,
        order_name: OrderTable.order_name,
        status: OrderTable.status,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        date_created: OrderTable.date_created,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
      })
      .from(OrderTable)
      .where(eq(OrderTable.status, status));
    //2024-07-09T05:00:00.000Z
    //2024-05-01T05:00:00.000Z
    // console.log(data.rows);
    // return data.rowCount && data.rowCount > 0 ? data.rows : [];
    return data as Order[];
  } catch (error) {
    // return [];
    throw new Error("Database Error: Failed to fetch draft orders");
  }
}

// export async function fetchOrders() {
//   try {
//     const data = await sql<Order>`
//             SELECT * FROM orders
//             WHERE status != ${OrderStatus.Draft} AND status != ${OrderStatus.Quote}
//         `;
//     console.log(data.rows);
//     return data.rowCount && data.rowCount > 0 ? data.rows : [];
//   } catch (error) {
//     throw new Error("Database Error: Failed to fetch orders");
//   }
// }

// export async function fetchOrderItems(orderId: string) {
//   try {
//     const data = await sql`
//         SELECT * FROM order_items
//         WHERE order_id = ${orderId}
//     `;
//     console.log(data.rows);
//     return data.rowCount && data.rowCount > 0 ? data.rows : [];
//   } catch (error) {
//     throw new Error("Database Error: Failed to fetch order items");
//   }
// }

// export async function fetchOrderTableData() {
//   try {
//     // SQL query to fetch data from orders, billing_info, and order_items tables
//     const data = await sql<OrderTableData>`
//       SELECT
//         o.id AS order_id,
//         o.order_name,
//         o.status,
//         o.shipping_info,
//         o.date_created,
//         o.date_updated,
//         o.date_submitted,
//         json_build_object(
//             'street', bi.street,
//             'apt_num', bi.apt_num,
//             'city', bi.city,
//             'state', bi.state,
//             'zip', bi.zip
//             'payment_method', bi.payment_method,
//             'purchase_order', bi.purchase_order,
//             'primary_contact_name', bi.primary_contact_name,
//             'primary_contact_email', bi.primary_contact_email,
//             'phone_num', bi.phone_num,
//             'alt_phone_num', bi.alt_phone_num,
//             'fax_num', bi.fax_num,
//             'isPrimary', bi.isPrimary,
//             'isActive', bi.isActive
//         ) AS billing_info,
//         json_agg(
//             json_build_object(
//                 'id', oi.id,
//                 'product_config', oi.product_config,
//                 'quantity', oi.quantity
//                 'note', oi.note,
//             )
//         ) FILTER (WHERE oi.id IS NOT NULL) AS order_items
//       FROM
//           orders o
//       LEFT JOIN
//           billing_info bi ON o.billing_info_id = bi.id
//       LEFT JOIN
//           order_items oi ON o.id = oi.order_id
//       GROUP BY
//           o.id, bi.id
//     `;

//     const tableData = data.rows.map((row) => {
//       //NOTE TODO: what is best practice for parsing JSON data
//       // const billing_addr = JSON.parse(String(row.billing_info.billing_addr));
//       const shipping_info = JSON.parse(String(row.shipping_info));
//       return {
//         ...row,
//         // billing_info: {
//         //   ...row.billing_info,
//         //   billing_addr,
//         // },
//         shipping_info,
//       };
//     });

//     return tableData;
//   } catch (error) {
//     throw new Error("Database Error: Failed to fetch order table data");
//   }
// }

/*
        SELECT o.id as order_id,
                o.order_name,
                o.status,
                o.shipping_info,
                o.date_created,
                o.date_updated,
                o.date_submitted,
                b.*,
                json_agg(oi) as order_items
        FROM orders o
        JOIN billing_info b ON o.billing_info_id = b.id
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id, b.id
*/

/**
 *       SELECT 
        o.id AS order_id, 
        o.order_name, 
        o.status, 
        o.shipping_info, 
        o.date_created, 
        o.date_updated, 
        o.date_submitted,
        json_build_object(
            'billing_addr', bi.billing_addr,
            'payment_method', bi.payment_method,
            'purchase_order', bi.purchase_order,
            'primary_contact_name', bi.primary_contact_name,
            'primary_contact_email', bi.primary_contact_email,
            'phone_num', bi.phone_num,
            'alt_phone_num', bi.alt_phone_num,
            'fax_num', bi.fax_num,
            'isPrimary', bi.isPrimary,
            'isActive', bi.isActive
        ) AS billing_info,
        json_agg(
            json_build_object(
                'id', oi.id,
                'glass_type', oi.glass_type,
                'shape', oi.shape,
                'dimensions', oi.dimensions,
                'thickness', oi.thickness,
                'tint', oi.tint,
                'fabrication_options', oi.fabrication_options,
                'misc_options', oi.misc_options,
                'note', oi.note,
                'quantity', oi.quantity
            )
        ) AS order_items
      FROM 
          orders o
      JOIN 
          billing_info bi ON o.billing_info_id = bi.id
      JOIN 
          order_items oi ON o.id = oi.order_id
      GROUP BY 
          o.id, bi.id
 */
