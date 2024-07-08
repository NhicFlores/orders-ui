const { db } = require("@vercel/postgres");
const {
  users,
} = require("@/lib/data/placeholder-data");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        //TODO: extendable permissions object for case-by-case basis
      const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
            INSERT INTO users (id, email, password)
            VALUES (${user.id}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
        })
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error("Error seeding users:", error);
      throw error;
    }
  }

  async function seedUserProfiles(client) {
    try {
        const createTable = await client.sql`
          CREATE TABLE user_profile (
            id SERIAL PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            name VARCHAR(255) NOT NULL,
            company VARCHAR(255),
            account_num VARCHAR(255),
            phone_num VARCHAR(255)
          );
        `;
        console.log(`Created "user_profile" table`);

        //here we can seed placeholder data 

        return createTable;
    } catch (error) {
        console.error("Error seeding user_profile:", error);
        throw error;
    }
  }

  async function seedShippingInfo(client) {
    try{
        const createTable = await client.sql`
          CREATE TABLE shipping_info (
            id SERIAL PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            delivery_addr VARCHAR(255),
            is_job_site BOOLEAN,
            note TEXT
          );
        `;
    } catch (error) {
        console.error("Error seeding shipping_info:", error);
        throw error;
    }
  }
  
  async function seedBillingInfo(client) {
    try {
      const createTable = await client.sql`
        CREATE TABLE billing_info (
          id SERIAL PRIMARY KEY,
          user_id UUID REFERENCES users(id),
          billing_addr VARCHAR(255),
          payment_method VARCHAR(255),
          purchase_order VARCHAR(255),
          primary_contact_name VARCHAR(255),
          primary_contact_email VARCHAR(255),
          phone_num VARCHAR(255),
          alt_phone_num VARCHAR(255),
          fax_num VARCHAR(255),
          isPrimary BOOLEAN DEFAULT false,
          isActive BOOLEAN DEFAULT true
        );
      `;
      console.log(`Created "billing_info" table`);
      return createTable;
    } catch (error) {
      console.error("Error seeding billing_info:", error);
      throw error;
    }
  }

  async function seedOrders(client) {
    try{
        const createTable = await client.sql`
          CREATE TABLE orders (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            entered_by VARCHAR(255),
            order_name VARCHAR(255) NOT NULL,
            billing_info_id INTEGER REFERENCES billing_info(id),
            shipping_info TEXT,
            status VARCHAR(255) NOT NULL, 
            date_created DATE NOT NULL,
            date_updated DATE,
            date_submitted DATE
        );
        `;
    } catch (error) {
        console.error("Error seeding orders:", error);
        throw error;
    }
  }

  async function seedOrderItems(client) {
    try{
        const createTable = await client.sql`
          CREATE TABLE order_items (
            id UUID PRIMARY KEY,
            order_id UUID REFERENCES orders(id),
            glass_type VARCHAR(255) NOT NULL,
            shape VARCHAR(255) NOT NULL,
            dimensions VARCHAR(255) NOT NULL,
            thickness VARCHAR(255) NOT NULL,
            tint VARCHAR(255) NOT NULL,
            fabrication_options VARCHAR(255),
            misc_options VARCHAR(255),
            note VARCHAR(255),
            quantity INTEGER NOT NULL
        );
        `;
    } catch (error) {
        console.error("Error seeding order items:", error);
        throw error;
    }
  }


  async function main() {
    const client = await db.connect();
  
    await seedUsers(client);
    await seedOrders(client);

    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err
    );
  });

  // all the tables that have been created 

  async function sqlStatements() {
    try {
      const createTables = await client.sql`
      
      DROP TABLE IF EXISTS shipping_info;
      DROP TABLE IF EXISTS billing_info;
      DROP TYPE IF EXISTS address;
      DROP TABLE IF EXISTS user_profile;
      DROP TABLE IF EXISTS users;
  
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        emailVerified DATE,
        password TEXT NOT NULL,
        role role DEFAULT 'USER' 
      );
  
    CREATE TABLE user_profile (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      account_num VARCHAR(255),
      phone_num VARCHAR(255)
    );

    CREATE TABLE shipping_info (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      delivery_addr VARCHAR(255),
      is_job_site BOOLEAN,
      note TEXT
    );

    CREATE TABLE billing_info (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      billing_addr VARCHAR(255),
      payment_method VARCHAR(255),
      purchase_order VARCHAR(255),
      primary_contact_name VARCHAR(255),
      primary_contact_email VARCHAR(255),
      phone_num VARCHAR(255),
      alt_phone_num VARCHAR(255),
      fax_num VARCHAR(255),
      isPrimary BOOLEAN DEFAULT false,
      isActive BOOLEAN DEFAULT true
    );
      `;
    } catch (error) {
      console.error("Error creating tables:", error);
      throw error;
    }
  }