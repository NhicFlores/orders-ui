"use server";
import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import {
  OrderInvoiceTable,
  OrderItemTable,
  OrderTable,
  UserProfileTable,
} from "@/drizzle/schema";
import {
  BillingInfoWithoutIds,
  Order,
  OrderItem,
  ShippingInfoWithoutIds,
} from "@/lib/data-model/schema-definitions";
import {
  InvoiceTableRow,
  OrderDetails,
  OrderStatus,
} from "@/lib/data-model/data-definitions";

// UNUSED FUNCTION
export async function fetchOrders() {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        created_by: OrderTable.created_by,
        customer_id: OrderTable.customer_id,
        order_name: OrderTable.order_name,
        order_number: OrderTable.order_number,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
        amount: OrderTable.amount,
        date_created: OrderTable.date_created,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
        date_shipped: OrderTable.date_shipped,
        date_delivered: OrderTable.date_delivered,
        // ordered_by_first_name: UserProfileTable.first_name,
        // ordered_by_last_name: UserProfileTable.last_name,
      })
      .from(OrderTable);
    // .innerJoin(
    //   UserProfileTable,
    //   eq(OrderTable.created_by, UserProfileTable.user_id)
    // );
    //2024-07-09T05:00:00.000Z
    //2024-05-01T05:00:00.000Z
    // console.log(data.rows);
    // return data.rowCount && data.rowCount > 0 ? data.rows : [];

    // NOTE: needs testing to ensure that the amount is parsed correctly
    const orders = result.map((row) => {
      return {
        ...row,
        amount: parseFloat(row.amount),
      };
    });

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
        order_id: OrderTable.order_id,
        created_by: OrderTable.created_by,
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

export async function fetchOrderTableData(): Promise<OrderDetails[]> {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        created_by: OrderTable.created_by,
        customer_id: OrderTable.customer_id,
        order_name: OrderTable.order_name,
        order_number: OrderTable.order_number,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
        date_created: OrderTable.date_created,
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
        eq(OrderTable.created_by, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.order_id, OrderInvoiceTable.order_id)
      )
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );

    const reducedResult = result.reduce<OrderDetails[]>((acc, row) => {
      const orderDetails = {
        order_id: row.order_id,
        created_by: row.created_by,
        customer_id: row.customer_id,
        order_name: row.order_name,
        order_number: row.order_number,
        shipping_data: row.shipping_data as ShippingInfoWithoutIds,
        billing_data: row.billing_data as BillingInfoWithoutIds,
        status: row.status as OrderStatus,
        date_created: row.date_created,
        date_updated: row.date_updated,
        date_submitted: row.date_submitted,
        date_shipped: row.date_shipped,
        date_delivered: row.date_delivered,
        amount: row.invoice_amount ? parseFloat(row.invoice_amount) : 0,
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

export async function getOrderDetailsByStatus(
  status: OrderStatus
): Promise<OrderDetails[]> {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        created_by: OrderTable.created_by,
        customer_id: OrderTable.customer_id,
        order_name: OrderTable.order_name,
        order_number: OrderTable.order_number,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
        date_created: OrderTable.date_created,
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
        eq(OrderTable.created_by, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.order_id, OrderInvoiceTable.order_id)
      )
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );

    const reducedResult = result.reduce<OrderDetails[]>((acc, row) => {
      const orderDetails = {
        order_id: row.order_id,
        created_by: row.created_by,
        customer_id: row.customer_id,
        order_name: row.order_name,
        order_number: row.order_number,
        shipping_data: row.shipping_data as ShippingInfoWithoutIds,
        billing_data: row.billing_data as BillingInfoWithoutIds,
        status: row.status as OrderStatus,
        date_created: row.date_created,
        date_updated: row.date_updated,
        date_submitted: row.date_submitted,
        date_shipped: row.date_shipped,
        date_delivered: row.date_delivered,
        amount: row.invoice_amount ? parseFloat(row.invoice_amount) : 0,
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

export async function fetchOrderDetailsById(orderId: string) {
  try {
    console.log("---- ORDER ID ----");
    console.log(orderId);
    console.log("----");
    const result = await db
      .select({
        order_id: OrderTable.order_id, // programmatic
        created_by: OrderTable.created_by, // programmatic
        customer_id: OrderTable.customer_id, // programmatic
        order_name: OrderTable.order_name, //
        order_number: OrderTable.order_number, // modifiable conditionally
        shipping_data: OrderTable.shipping_data, // modifiable conditionally
        billing_data: OrderTable.billing_data, // modifiable conditionally
        status: OrderTable.status, // programmatic
        amount: OrderTable.amount, // modifiable conditionally
        date_created: OrderTable.date_created, // programmatic
        date_updated: OrderTable.date_updated, // programmatic
        date_submitted: OrderTable.date_submitted, // programmatic
        date_shipped: OrderTable.date_shipped, // modifiable conditionally
        date_delivered: OrderTable.date_delivered, // modifiable conditionally
        order_invoice_id: OrderInvoiceTable.order_invoice_id,
        invoice_number: OrderInvoiceTable.invoice_number,
        ordered_by:
          sql`${UserProfileTable.first_name} || ' ' || ${UserProfileTable.last_name}`.as(
            "ordered_by"
          ),
        order_items: OrderItemTable,
      })
      .from(OrderTable)
      .where(eq(OrderTable.order_id, orderId))
      .leftJoin(
        UserProfileTable,
        eq(OrderTable.created_by, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.order_id, OrderInvoiceTable.order_id)
      )
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );

    console.log("---- fetchOrderDetailsById ----");
    console.log("RESULT");
    console.log(result);
    console.log("RESULT LENGTH");
    console.log(result.length);
    // const reducedResult = result.reduce<OrderDetails>((acc, row) => {

    // }, {});
    // TODO NOTE: destructure the result and process each field to strongly type the result

    console.log(" ELEMENT 0 ");
    console.log(result[0]);
    console.log("----");
    console.log(" ELEMENT 1 ");
    console.log(result[1]);
    console.log("----");

    const orderInfo = {...result[0],
      amount: parseFloat(result[0].amount),
      shipping_data: result[0].shipping_data as ShippingInfoWithoutIds,
      billing_data: result[0].billing_data as BillingInfoWithoutIds,
      order_items: [],
    }

    return orderInfo as OrderDetails;
  } catch (error) {
    throw new Error("Database Error: Failed to fetch order details");
  }
}

export async function fetchOrderItems(orderId: string) {
  try {
    const result = await db
      .select()
      .from(OrderItemTable)
      .where(eq(OrderItemTable.order_id, orderId)); 


    return result as OrderItem[];
  } catch {
    throw new Error("Database Error: Failed to fetch order items");
  }
}

export async function fetchInvoiceTableData() {
  try {
    const result = await db
      .select({
        order_invoice_id: OrderInvoiceTable.order_invoice_id,
        created_by: OrderInvoiceTable.created_by,
        order_id: OrderInvoiceTable.order_id,
        date_created: OrderInvoiceTable.date_created,
        status: OrderInvoiceTable.status,
        amount: OrderInvoiceTable.amount,
        customer_name:
          sql`${UserProfileTable.first_name} || ' ' || ${UserProfileTable.last_name}`.as(
            "customer_name"
          ),
        order_name: OrderTable.order_name,
        // need purchase order if available on order.billing_data object
      })
      .from(OrderInvoiceTable)
      .leftJoin(
        UserProfileTable,
        eq(OrderInvoiceTable.created_by, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderTable,
        eq(OrderInvoiceTable.order_id, OrderTable.order_id)
      );

    const formattedResult = result.map((row) => {
      return {
        ...row,
        amount: parseFloat(row.amount),
      };
    });

    return formattedResult as InvoiceTableRow[];
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
