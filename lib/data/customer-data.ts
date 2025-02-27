// fetch functions
// fetch functions for users

import {
  Customer,
  CustomerBillingInformation,
  CustomerShippingInformation,
} from "../data-model/schema-types";
import { db } from "@/drizzle/db";
import {
  CustomerBillingInformationTable,
  CustomerShippingInformationTable,
  CustomerTable,
  OrderInvoiceTable,
  OrderTable,
} from "@/drizzle/schema";
import { and, eq, not, or, sql } from "drizzle-orm";
import { CustomerTableRow } from "../data-model/query-types";
import { InvoiceStatusOptions, OrderStatusOptions } from "../data-model/enum-types";

export async function getCustomers(): Promise<Customer[]> {
  try {
    const result = await db.select().from(CustomerTable);

    const customers = result.map((row) => {
      return {
        ...row,
        credit_limit: parseFloat(row.credit_limit.toString()),
        date_updated: new Date(row.date_updated),
      };
    });

    return customers;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers.");
  }
}

export async function fetchCustomerData() {
  const result = await db
    .select({
      customer_id: CustomerTable.customer_id,
      name: CustomerTable.name,
      account_num: CustomerTable.account_num,
      credit_status: CustomerTable.credit_status,
      credit_limit: CustomerTable.credit_limit,
      unpaid_invoice_count:
        sql`COUNT(${OrderInvoiceTable.order_invoice_id}) FILTER (WHERE ${OrderInvoiceTable.status} = 'UNPAID')`.as(
          "unpaid_invoice_count"
        ),
      unpaid_invoice_sum:
        sql`SUM(${OrderInvoiceTable.amount}) FILTER (WHERE ${OrderInvoiceTable.status} = 'UNPAID')`.as(
          "unpaid_invoice_sum"
        ),
      paid_invoice_sum:
        sql`SUM(${OrderInvoiceTable.amount}) FILTER (WHERE ${OrderInvoiceTable.status} = 'PAID')`.as(
          "paid_invoice_sum"
        ),
      order_count: sql`COUNT(${OrderTable.order_id})`.as("order_count"),
      most_recent_order_date: sql`MAX(${OrderTable.date_submitted})`.as(
        "most_recent_order_date"
      ),
    })
    .from(CustomerTable)
    .leftJoin(
      OrderInvoiceTable,
      sql`${CustomerTable.customer_id} = ${OrderInvoiceTable.customer_id}`
    )
    .leftJoin(
      OrderTable,
      sql`${CustomerTable.customer_id} = ${OrderTable.customer_id}`
    )
    .groupBy(
      CustomerTable.customer_id,
      CustomerTable.name,
      CustomerTable.account_num,
      CustomerTable.credit_status,
      CustomerTable.credit_limit
    );

  return result;
}

export async function getOrderByFilter() {
  try {
    const result = await db
      .select()
      .from(OrderTable)
      .where(
        and(
          not(eq(OrderTable.status, OrderStatusOptions.Draft)),
          not(eq(OrderTable.status, OrderStatusOptions.Cancelled))
        )
      );

    return result;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Failed to fetch orders.");
  }
}

export async function getNumberOfOrders() {
  try {
    const result = await db.select({
      customer_id: CustomerTable.customer_id,
      name: CustomerTable.name,
      order_count: sql`COUNT(${OrderTable.order_id})`.as("order_count"),
    })
    .from(CustomerTable)
    .leftJoin(
      OrderTable,
      and(
        eq(OrderTable.customer_id, CustomerTable.customer_id),
        and(
          not(eq(OrderTable.status, OrderStatusOptions.Draft)),
          not(eq(OrderTable.status, OrderStatusOptions.Cancelled))
        )
      )
    )
    // .leftJoin(OrderTable, eq(OrderTable.customer_id, CustomerTable.customer_id))
    // .where(
    //   and(
    //     not(eq(OrderTable.status, OrderStatusOptions.Draft)),
    //     not(eq(OrderTable.status, OrderStatusOptions.Cancelled))
    //   )
    // )
    .groupBy(CustomerTable.customer_id, CustomerTable.name);

    console.log("RESULT", result);
  
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Failed to fetch orders.");
  }
}

export async function getInvoiceSummaryPerCustomer() {
  try {
    const result = await db.select({
      customer_id: CustomerTable.customer_id,
      name: CustomerTable.name,
      invoice_count: sql`COUNT(${OrderInvoiceTable.order_invoice_id})`.as("invoice_count"),
      unpaid_invoice_count: sql`COUNT(${OrderInvoiceTable.order_invoice_id}) FILTER (WHERE ${OrderInvoiceTable.status} = ${InvoiceStatusOptions.Unpaid})`.as("unpaid_invoice_count"),
      paid_invoice_count: sql`COUNT(${OrderInvoiceTable.order_invoice_id}) FILTER (WHERE ${OrderInvoiceTable.status} = ${InvoiceStatusOptions.Paid})`.as("paid_invoice_count"),
    })
    .from(CustomerTable)
    .leftJoin(OrderInvoiceTable, eq(OrderInvoiceTable.customer_id, CustomerTable.customer_id))
    .groupBy(CustomerTable.customer_id, CustomerTable.name)

    console.log("INVOICE SUMMARY", result);

    // return result;
  } catch (error) {
    console.error("Failed to fetch invoice summary:", error);
    throw new Error("Failed to fetch invoice summary.");
  }
}

/**
 * this query fetches aggregate data from the invoice and order tables
 * for each customer in the customer table
 * @returns
 */
export async function getCustomerTableData(): Promise<CustomerTableRow[]> {
  try {
    const result = await db
      .select({
        customer_id: CustomerTable.customer_id,
        name: CustomerTable.name,
        account_num: CustomerTable.account_num,
        credit_status: CustomerTable.credit_status,
        credit_limit: CustomerTable.credit_limit,
        unpaid_invoice_count: sql<number>`COUNT(${OrderInvoiceTable.order_invoice_id}) FILTER (WHERE ${OrderInvoiceTable.status} = '${sql.raw(InvoiceStatusOptions.Unpaid)}')`.as("unpaid_invoice_count"),
        unpaid_invoice_sum: sql<number>`SUM(${OrderInvoiceTable.amount}) FILTER (WHERE ${OrderInvoiceTable.status} = '${sql.raw(InvoiceStatusOptions.Unpaid)}')`.as("unpaid_invoice_sum"),
        total_spent: sql<number>`SUM(${OrderInvoiceTable.amount}) FILTER (WHERE ${OrderInvoiceTable.status} = '${sql.raw(InvoiceStatusOptions.Paid)}')`.as("total_spent"),
        order_count: sql<number>`COUNT(${OrderTable.order_id})`.as("order_count"),
        latest_order_date: sql<string>`MAX(${OrderTable.date_submitted})`.as("latest_order_date")
      })
      .from(CustomerTable)
      .leftJoin(OrderInvoiceTable, eq(OrderInvoiceTable.customer_id, CustomerTable.customer_id))
      .leftJoin(
        OrderTable,
        and(
          eq(OrderTable.customer_id, CustomerTable.customer_id),
          and(
            not(eq(OrderTable.status, OrderStatusOptions.Draft)),
            not(eq(OrderTable.status, OrderStatusOptions.Cancelled))
          )
        )
      )
      .groupBy(
        CustomerTable.customer_id,
        CustomerTable.name, 
        CustomerTable.account_num,
        CustomerTable.credit_status,
        CustomerTable.credit_limit
      );

    const tableRows = result.map((row) => {
      // const unpaidInvoiceSum = parseFloat(row.unpaid_invoice_sum.toString())
      return {
        ...row,
        balance: row.credit_limit - row.unpaid_invoice_sum,
        total_spent: parseFloat(row.total_spent.toString()),
        // order_count: parseInt(row.order_count.toString()),
        latest_order_date: new Date(row.latest_order_date),
      }
    })

    return tableRows;
    // return result
  } catch (error) {
    console.error("Failed to fetch customer table data:", error);
    throw new Error("Failed to fetch customer table data.");
  }
}

export async function getBillingInfoByCustomerId(customerId: string) {
  try {
    const result = await db
      .select()
      .from(CustomerBillingInformationTable)
      .where(eq(CustomerBillingInformationTable.customer_id, customerId));

    console.log("BILLING INFO:", result);
    return result as CustomerBillingInformation[];
    // return billingInfoData.rows.map((row) => {
    //   let billing_addr;
    //   try {
    //     billing_addr =
    //       typeof row.billing_addr === "string"
    //         ? JSON.parse(row.billing_addr)
    //         : row.billing_addr;
    //   } catch (error) {
    //     billing_addr = row.billing_addr;
    //   }
    //   return {
    //     ...row,
    //     billing_addr,
    //   };
    // });
  } catch (error) {
    console.error("Failed to fetch billing info:", error);
    throw new Error("Failed to fetch billing info.");
  }
}

export async function getShippingInfoByCustomerId(customerId: string) {
  try {
    const result = await db
      .select()
      .from(CustomerShippingInformationTable)
      .where(eq(CustomerShippingInformationTable.customer_id, customerId));
    console.log("SHIPPING INFO:", result);
    // return shippingInfo.rows.map((row) => {
    //   let delivery_addr;
    //   try{
    //     delivery_addr = JSON.parse(String(row.delivery_addr));
    //   } catch (error) {
    //     delivery_addr = row.delivery_addr;
    //   }
    //   return {
    //     ...row,
    //     delivery_addr
    //   };
    // })
    return result as CustomerShippingInformation[];
  } catch (error) {
    console.error("Failed to fetch shipping info:", error);
    throw new Error("Failed to fetch shipping info.");
  }
}
