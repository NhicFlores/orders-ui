// fetch functions
import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Order_DEPRECATED,
  OrderForm,
} from "@/lib/definitions/definitions";
import { OrderStatus, TestOrder } from "@/lib/definitions/order-definitions";
import { formatCurrency } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { Order } from "../data-model/schema-definitions";

//create fetch functions for orders where status = draft, quote
//refactor - fetch data file for each tab to keep my fetch types separate

export async function fetchOrders() {
  noStore();
  // console.log("made it to fetch orders yo");
  try {
    const data = await sql<Order_DEPRECATED>`
        SELECT * FROM orders
        WHERE orders.status != ${OrderStatus.Draft} AND orders.status != ${OrderStatus.Quote}
        `;
    // console.log("--------- got the orders ----------");
    // console.log(data.rows[0]);
    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch order data");
  }
}

export async function fetchQuote() {
  // check the need for noStore on this function
  try {
    const data = await sql<Order>`
        SELECT * FROM orders
        WHERE orders.status = ${OrderStatus.Quote};
      `;

    /*const order = data.rows.map((order) => ({
        ...order,
        //convert from cents to dollars 
        price: order.price / 100,
      }));*/
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch Quotes");
  }
}

export async function fetchDraftOrders() {
  try {
    //IMPLEMENTATION NOTE: type your sql queries
    const data = await sql<Order_DEPRECATED>`
      SELECT * FROM orders
      WHERE orders.status = ${OrderStatus.Draft}
    `;
    // console.log("got the drafts");
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to get Drafts");
  }
}

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

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 4000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}
// NOTE: deprecated
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

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
// NOTE TEST FUNCTION
export async function fetchTestOrders() {
  noStore();
  try {
    console.log("----------- fetching test orders ------------");
    const data = await sql<TestOrder>`
      SELECT * FROM test_order
      `;

    // const orders = data.rows.map((order) => ({
    //   ...order,
    //   order_items: JSON.parse(order.order_items),
    // }))
    console.log("----------- got the test orders ------------");

    console.log("type of data: ", typeof data);
    console.log(data);

    console.log("type of data rows: ", typeof data.rows);
    console.log(data.rows);

    console.log("type of row elements: ", typeof data.rows[0]);
    console.log(data.rows[0]);

    console.log("type of order items: ", typeof data.rows[0].order_items);
    console.log(data.rows[0].order_items);

    const parsedOrders = data.rows.map((order) => {
      let order_items;
      try {
        order_items =
          typeof order.order_items === "string"
            ? JSON.parse(order.order_items)
            : order.order_items;
      } catch (error) {
        order_items = order.order_items;
      }
      return {
        ...order,
        order_items,
      };
    });
    console.log("type of parsed orders: ", typeof parsedOrders);
    console.log(parsedOrders);
    console.log("type of parsed order items: ");
    console.log(typeof parsedOrders[0].order_items[0]);
    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch test order data");
  }
}
