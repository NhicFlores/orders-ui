"use server";
import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import {
  CustomerTable,
  OrderInvoiceTable,
  OrderItemTable,
  OrderTable,
  UserProfileTable,
} from "@/drizzle/schema";
import {
  CustomerBillingInformation,
  CustomerShippingInformation,
  OrderItem,
} from "@/lib/data-model/schema-types";
import { InvoiceTableRow, OrderTableRow } from "@/lib/data-model/query-types";
import {
  OrderStatus,
  isValidOrderStatus,
  OrderStatusOptions,
} from "@/lib/data-model/enum-types";
import { getDefaultBillingValues } from "@/lib/data-model/default-constructors";
import { date } from "drizzle-orm/mysql-core";

/**
 * this function fetches data necessary to populate the Order Table
 * @returns array of type OrderTableRow
 */
export async function fetchOrderTableData(): Promise<OrderTableRow[]> {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        user_id: OrderTable.user_id,
        customer_id: OrderTable.customer_id,
        order_name: OrderTable.order_name,
        order_number: OrderTable.order_number,
        shipping_data: OrderTable.shipping_data,
        // NOTE: data table should only pull necessary data to view and sort orders 
        // order page will have the rest of the data 
        // NOTE: billing, shipping, and order items will be removed from order table 
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
        date_shipped: OrderTable.date_shipped,
        date_delivered: OrderTable.date_delivered,
        invoice_amount: OrderInvoiceTable.amount,
        order_invoice_id: OrderInvoiceTable.order_invoice_id,
        ordered_by:
          sql`${UserProfileTable.first_name} || ' ' || ${UserProfileTable.last_name}`.as(
            "ordered_by"
          ),
        order_item: OrderItemTable,
      })
      .from(OrderTable)
      .leftJoin(
        UserProfileTable,
        eq(OrderTable.user_id, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.order_id, OrderInvoiceTable.order_id)
      )
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );

    const reducedResult = result.reduce<OrderTableRow[]>((acc, row) => {
      const orderDetails = {
        order_id: row.order_id,
        user_id: row.user_id,
        customer_id: row.customer_id,
        order_name: row.order_name,
        order_number: row.order_number,
        shipping_data: row.shipping_data as CustomerShippingInformation,
        billing_data: row.billing_data as CustomerBillingInformation,
        status: isValidOrderStatus(row.status)
          ? row.status
          : OrderStatusOptions.Draft,
        date_updated: row.date_updated,
        date_submitted: row.date_submitted ? row.date_submitted : null,
        date_shipped: row.date_shipped ? row.date_shipped : null,
        date_delivered: row.date_delivered ? row.date_delivered : null,
        // amount: row.invoice_amount ? parseFloat(row.invoice_amount) : 0,
        amount: row.invoice_amount ?? 0,
        order_invoice_id: row.order_invoice_id ? row.order_invoice_id : "",
        ordered_by: row.ordered_by as string,
        order_items: [],
      };
      const orderItem = row.order_item as OrderItem;

      let existingOrderInfo = acc.find(
        (o) => o.order_id === orderDetails.order_id
      );

      if (!existingOrderInfo) {
        existingOrderInfo = orderDetails;
        acc.push(existingOrderInfo);
      }

      if (orderItem) {
        existingOrderInfo.order_items.push(orderItem);
      }

      return acc;
    }, []);

    return reducedResult;
  } catch (error) {
    // return [];
    throw new Error("Database Error: Failed to fetch draft orders");
  }
}
/**
 * this function fetches data to populate Order Table, filtered by status
 * @param status
 * @returns
 */
export async function getOrderDetailsByStatus(
  status: OrderStatus
): Promise<OrderTableRow[]> {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        user_id: OrderTable.user_id,
        customer_id: OrderTable.customer_id,
        order_name: OrderTable.order_name,
        order_number: OrderTable.order_number,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
        date_shipped: OrderTable.date_shipped,
        date_delivered: OrderTable.date_delivered,
        invoice_amount: OrderInvoiceTable.amount,
        order_invoice_id: OrderInvoiceTable.order_invoice_id,
        ordered_by:
          sql`${UserProfileTable.first_name} || ' ' || ${UserProfileTable.last_name}`.as(
            "ordered_by"
          ),
        order_item: OrderItemTable,
      })
      .from(OrderTable)
      .where(eq(OrderTable.status, status))
      .leftJoin(
        UserProfileTable,
        eq(OrderTable.user_id, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.order_id, OrderInvoiceTable.order_id)
      )
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );
    console.log(" ---- ");
    console.log("--- GOT ORDER DETAILS BY STATUS ---");
    const reducedResult = result.reduce<OrderTableRow[]>((acc, row) => {
      const orderDetails = {
        order_id: row.order_id,
        user_id: row.user_id,
        customer_id: row.customer_id,
        order_name: row.order_name,
        order_number: row.order_number,
        shipping_data: row.shipping_data as CustomerShippingInformation,
        billing_data: row.billing_data as CustomerBillingInformation,
        status: isValidOrderStatus(row.status)
          ? row.status
          : OrderStatusOptions.Draft,
        date_updated: row.date_updated,
        date_submitted: row.date_submitted ? row.date_submitted : null,
        date_shipped: row.date_shipped ? row.date_shipped : null,
        date_delivered: row.date_delivered ? row.date_delivered : null,
        amount: row.invoice_amount ? row.invoice_amount : 0,
        order_invoice_id: row.order_invoice_id ? row.order_invoice_id : "",
        ordered_by: row.ordered_by as string,
        order_items: [],
      };
      const orderItem = row.order_item as OrderItem;

      let existingOrderInfo = acc.find(
        (o) => o.order_id === orderDetails.order_id
      );

      if (!existingOrderInfo) {
        existingOrderInfo = orderDetails;
        acc.push(existingOrderInfo);
      }

      if (orderItem) {
        existingOrderInfo.order_items.push(orderItem);
      }

      return acc;
    }, []);

    return reducedResult;
  } catch (error) {
    // return [];
    throw new Error("Database Error: Failed to fetch draft orders");
  }
}

/**
 * fetches data to populate the Invoice Table
 * @returns array of type InvoiceTableRow
 */
export async function fetchInvoiceTableData(): Promise<InvoiceTableRow[]> {
  try {
    const result = await db
      .select({
        // invoice table columns
        order_invoice_id: OrderInvoiceTable.order_invoice_id,
        user_id: OrderInvoiceTable.user_id,
        order_id: OrderInvoiceTable.order_id,
        customer_id: OrderInvoiceTable.customer_id,
        invoice_number: OrderInvoiceTable.invoice_number,
        status: OrderInvoiceTable.status,
        amount: OrderInvoiceTable.amount,
        invoice_date: OrderInvoiceTable.invoice_date,
        date_updated: OrderInvoiceTable.date_updated,
        // customer table columns
        customer_name: CustomerTable.name,
        // user profile table columns
        created_by_name:
          sql<string>`${UserProfileTable.first_name} || ' ' || ${UserProfileTable.last_name}`.as(
            "created_by_name"
          ),
        // order table columns
        order_name: OrderTable.order_name,
        billing_data: OrderTable.billing_data,
        // need purchase order if available on order.billing_data object
      })
      .from(OrderInvoiceTable)
      .leftJoin(
        CustomerTable,
        eq(OrderInvoiceTable.customer_id, CustomerTable.customer_id)
      )
      .leftJoin(
        UserProfileTable,
        eq(OrderInvoiceTable.user_id, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderTable,
        eq(OrderInvoiceTable.order_id, OrderTable.order_id)
      );

    const formattedResult = result.map((row) => {
      // console.log(row.created_by_name)
      // console.log(typeof row.created_by_name)
      return {
        ...row,
        // amount: parseFloat(row.amount),
        customer_name: row.customer_name ?? "NO CUSTOMER NAME",
        created_by_name: row.created_by_name ?? "NO USER NAME",
        order_name: row.order_name ?? "NO ORDER NAME",
        billing_data: row.billing_data
          ? row.billing_data
          : getDefaultBillingValues(),
      };
    });

    return formattedResult;
  } catch (error) {
    throw new Error("Database Error: Failed to fetch invoice table data");
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
//       //RESEARCH NOTE: what is best practice for parsing JSON data
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
