const { db } = require('@vercel/postgres');
const {
  orders,
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          emailVerified DATE,
          password TEXT NOT NULL,
          role role DEFAULT 'USER' 
        );
      `;
      console.log(`Created "users" table`);

      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );

      console.log(`Seeded ${insertedUsers.length} users`);

      return {
        createTable,
        users: insertedUsers,
      };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

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
    console.error('Error seeding tokens:', error);
    throw error;
  }
}

// DEPRACATED 
// async function seedUsers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "users" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

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
      `,
      ),
    );

    console.log(`Seeded ${insertedOrders.length} orders`);

    return {
      createTable,
      orders: insertedOrders,
    };
  } catch (error) {
    console.error('Error seeding orders:', error);
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
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
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
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
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
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

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
    'An error occurred while attempting to seed the database:',
    err,
  );
});

async function sqlStatements() {
  try {
    const createTables = await client.sql`
    CREATE TABLE address (
      id SERIAL PRIMARY KEY,
      city VARCHAR(255),
      state VARCHAR(255),
      zip VARCHAR(255),
      county VARCHAR(255),
      country VARCHAR(255)
  );
  
  CREATE TABLE billing_info (
      id SERIAL PRIMARY KEY,
      billing_addr_prim INTEGER REFERENCES Address(id),
      billing_addr_sec INTEGER REFERENCES Address(id),
      payment_method VARCHAR(255),
      purchase_order VARCHAR(255),
      additional_info VARCHAR(255),
      primary_contact_name VARCHAR(255),
      primary_contact_email VARCHAR(255),
      phone_num VARCHAR(255),
      alt_phone_num VARCHAR(255),
      fax_num VARCHAR(255)
  );
  
  CREATE TABLE shipping_info (
      id SERIAL PRIMARY KEY,
      delivery_addr INTEGER REFERENCES Address(id),
      is_job_site BOOLEAN
  );
  
  CREATE TABLE user_profile (
      id UUID PRIMARY KEY,
      name VARCHAR(255),
      account_num VARCHAR(255),
      phone_num VARCHAR(255),
      billing_info INTEGER REFERENCES Billing_Info(id),
      shipping_info INTEGER REFERENCES ShippingInfo(id)
  );
  CREATE TABLE user_profile (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    company VARCHAR(255),
    account_num VARCHAR(255),
    phone_num VARCHAR(255)
);
CREATE TABLE shipping_info (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id),
  delivery_addr Address,
  is_job_site BOOLEAN,
  note TEXT
);
CREATE TABLE billing_info (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id),
  billing_addr_prim Address,
  billing_addr_sec Address,
  payment_method VARCHAR(255),
  purchase_order VARCHAR(255),
  additional_info VARCHAR(255),
  primary_contact_name VARCHAR(255),
  primary_contact_email VARCHAR(255),
  phone_num VARCHAR(255),
  alt_phone_num VARCHAR(255),
  fax_num VARCHAR(255)
);
    `;
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}