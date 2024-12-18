const { db } = require("@vercel/postgres");
const {
  orders,
  invoices,
  customers,
  revenue,
  users,
} = require("@/lib/data/placeholder-data");
const bcrypt = require("bcrypt");

//NOTE TODO: finish token script
async function seedToken(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "verificationTokens" table if it doesn't exist
    // hash email to create token
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS verificationTokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
    token: 
    expiresAt DATE NOT NULL
    );
    `;

    console.log(`Created "verificationTokens" table`);
    // NOTE TODO: seed tokens function
    // Insert data into the "verificationTokens" table
    // const insertedTokens = await Promise.all(
    //   invoices.map(
    //     (token) => client.sql`
    //     INSERT INTO verificationTokens (customer_id, amount, status, date)
    //     VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
    //     ON CONFLICT (id) DO NOTHING;
    //   `,
    //   ),
    // );

    console.log(`Seeded ${insertedTokens.length} tokens`);

    return {
      createTable,
      tokens: insertedTokens,
    };
  } catch (error) {
    console.error("Error seeding tokens:", error);
    throw error;
  }
}

async function seedNewOrders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // NOTE TODO: create new_orders table
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS new_orders (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      order_name VARCHAR(255) NOT NULL,
      product_config JSONB NOT NULL,
      billing_info_id INTEGER REFERENCES billing_info(id),
      shipping_info_id INTEGER REFERENCES shipping_info(id),
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
    );
    `;

    console.log(`Created "new_orders" table`);
  } catch (error) {
    console.error("Error seeding new_orders:", error);
    throw error;
  }
}

async function seedOrders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "orders" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    order_name VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(19,4) NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "orders" table`);

    // Insert data into the "orders" table
    const insertedOrders = await Promise.all(
      orders.map(
        (order) => client.sql`
        INSERT INTO orders (customer_id, order_name, product_id, quantity, price, status, date)
        VALUES (${order.customer_id}, ${order.order_name}, ${order.product_id}, ${order.quantity}, ${order.price}, ${order.status}, ${order.date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedOrders.length} orders`);

    return {
      createTable,
      orders: insertedOrders,
    };
  } catch (error) {
    console.error("Error seeding orders:", error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
    );
    `;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

// NOTE TEST SEED FUNCTIONS
async function seedTestConfig(client) {
  try {
    //DROP TABLE IF EXISTS test_config
    const createTable = await client.sql`
      CREATE TABLE test_config (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  glass_type VARCHAR(255) NOT NULL,
  glass_shape VARCHAR(255) NOT NULL,
  glass_dimensions VARCHAR(255) NOT NULL,
  glass_thickness VARCHAR(255) NOT NULL,
  glass_tint VARCHAR(255) NOT NULL,
  fabrication_options VARCHAR(255) NOT NULL,
  glass_options VARCHAR(255) NOT NULL,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES test_order(id)
);
`;
    console.log(`Created "TestConfig" table`);
    return createTable;
  } catch (error) {
    console.error("Error seeding TestConfig:", error);
    throw error;
  }
}

async function seedTestOrder(client) {
  try {
    //DROP TABLE IF EXISTS test_order;
    const createTable = await client.sql`
    CREATE TABLE test_order (
  id SERIAL PRIMARY KEY,
  order_name VARCHAR(255) NOT NULL,
  order_items TEXT,
  status VARCHAR(255) NOT NULL
);
`;
    console.log(`Created "TestOrder" table`);
    return createTable;
  } catch (error) {
    console.error("Error seeding TestOrder:", error);
    throw error;
  }
}

// INSERT INTO billing_info (
//   user_id,
//   billing_addr,
//   payment_method,
//   purchase_order,
//   primary_contact_name,
//   primary_contact_email,
//   phone_num,
//   alt_phone_num,
//   fax_num
// ) VALUES
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('123 Main St', 'Apt 1', 'New York', 'NY', '10001', 'USA'), 'Credit Card', 'PO12345', 'John Doe', 'john.doe@example.com', '123-456-7890', '098-765-4321', '111-222-3333'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('456 Maple Ave', 'Apt 2', 'Los Angeles', 'CA', '90001', 'USA'), 'Debit Card', 'PO23456', 'Jane Smith', 'jane.smith@example.com', '234-567-8901', '109-876-5432', '222-333-4444'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('789 Oak Dr', 'Apt 3', 'Chicago', 'IL', '60007', 'USA'), 'PayPal', 'PO34567', 'Bob Johnson', 'bob.johnson@example.com', '345-678-9012', '210-987-6543', '333-444-5555'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('012 Pine Rd', 'Apt 4', 'Houston', 'TX', '77001', 'USA'), 'Bank Transfer', 'PO45678', 'Alice Williams', 'alice.williams@example.com', '456-789-0123', '321-098-7654', '444-555-6666'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('345 Birch Ln', 'Apt 5', 'Phoenix', 'AZ', '85001', 'USA'), 'Check', 'PO56789', 'Charlie Brown', 'charlie.brown@example.com', '567-890-1234', '432-109-8765', '555-666-7777');

async function main() {
  const client = await db.connect();

  await seedOrders(client);
  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});



/**
 * -----------For testing purposes only-----------
CREATE TABLE user_profile (
  id SERIAL PRIMARY KEY, ---------- UUID is less readable, more random than SERIAL. good for anonymity, but will make indexing take longer
  user_id UUID REFERENCES users(id),
  company VARCHAR(255),
  account_num VARCHAR(255),
  phone_num VARCHAR(255),
  billing_info INTEGER REFERENCES billing_info(id),
  shipping_info INTEGER REFERENCES shipping_info(id)
);
 */

/**
 * ----------- Unused type -----------
 *     CREATE TYPE address AS (
      street VARCHAR(255),
      apt_num VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      zip VARCHAR(255),
      country VARCHAR(255)
  );
 */
