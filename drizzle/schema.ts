
import { OrderStatus } from "@/lib/data-model/data-definitions";
import { UserRole } from "@/lib/data-model/schema-definitions";
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  decimal,
  integer,
  jsonb,
  pgSchema,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// TODO NOTE: optimize date types - check why drizzle is inferring { mode: string }
// SET TIMEZONE in db connection
// cannot use other functions in schema declaration file
// export const dbSchema = pgSchema(getSchemaName());
export const dbSchema = pgSchema("dev-schema");
// if (!dbSchema.schemaName) {
//   throw new Error("Schema not found");
// }

// export const UserRole = dbSchema.enum("user_role", ["ADMIN", "USER"]);

export const UserTable = dbSchema.table(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(), // need .defaultRandom() for generating UUIDs
    email: varchar("email", { length: 255 }).notNull().unique(),
    // emailVerified: date('emailVerified'),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 255 }).default("USER"),
    // at the end of day, a script runs to move records of deactivated users to
    // archive db
    is_active: boolean("is_active").notNull().default(true),
  },
  (table) => [
    check(
      "USER_ROLE_CHECK",
      sql`${table.role} = '${sql.raw(UserRole.Admin)}' OR ${
        table.role
      } = '${sql.raw(UserRole.User)}'`
    ),
  ]
);
// user profile and and user tables could be one table, but the profile is
// more likely to change, so if i keep them separate, the user
// table, which has credentials, is less likely to need modification
// one-to-one with user table
export const UserProfileTable = dbSchema.table("user_profiles", {
  profile_id: serial("profile_id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),

  phone_num: varchar("phone_num", { length: 255 }),
  // if a user is also a customer or represents a customer such as a sales rep
  // customer_id: uuid("customer_id").references(() => CustomerTable.customer_id),
  // last login? we need a way to determine inactive users
});

// IMPLEMENTATION NOTE: customers table
// customer could be a separate entity which requires a separate table
// or it could be a field or status in the user table
// ROLE: ADMIN, CUSTOMER
// what if we have multiple customers with the same company?
// can admin also enter orders for themselves?

export const CustomerTable = dbSchema.table("customers", {
  customer_id: uuid("customer_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  // type: individual, business, non-profit, gov, etc
  type: varchar("type", { length: 255 }).notNull(),
  account_num: varchar("account_num", { length: 255 }),
  credit_status: varchar("credit_status", { length: 255 }),
  credit_limit: decimal("credit_limit", { precision: 10, scale: 2 }),
  // credit_terms
  // credit_balance
  // payment type
  date_created: timestamp("date_created", { withTimezone: true }).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).notNull(),
});

// // one-to-many with customer table
export const CustomerShippingInformationTable = dbSchema.table(
  "customer_shipping_information",
  {
    shipping_info_id: serial("shipping_info_id").primaryKey(),
    customer_id: uuid("customer_id")
      .notNull()
      .references(() => CustomerTable.customer_id, { onDelete: "cascade" }),
    street: varchar("street", { length: 255 }).notNull(),
    apt_num: varchar("apt_num", { length: 255 }),
    city: varchar("city", { length: 255 }).notNull(),
    state: varchar("state", { length: 255 }).notNull(),
    zip: varchar("zip", { length: 255 }).notNull(),
    is_job_site: boolean("is_job_site").notNull().default(false),
    note: varchar("note", { length: 255 }),
  }
);

// // users can add and delete billing info at any time
// // relevant billing info will be serialized and stored in the order table
// // one-to-many with customer table
export const CustomerBillingInformationTable = dbSchema.table(
  "customer_billing_information",
  {
    billing_info_id: serial("billing_info_id").primaryKey(),
    customer_id: uuid("customer_id")
      .notNull()
      .references(() => CustomerTable.customer_id, { onDelete: "cascade" }),
    street: varchar("street", { length: 255 }).notNull(),
    apt_num: varchar("apt_num", { length: 255 }),
    city: varchar("city", { length: 255 }).notNull(),
    state: varchar("state", { length: 255 }).notNull(),
    zip: varchar("zip", { length: 255 }).notNull(),
    payment_method: varchar("payment_method", { length: 255 }).notNull(),
    // payment_info: jsonb("payment_info"),
    purchase_order: varchar("purchase_order", { length: 255 }),
    primary_contact_name: varchar("primary_contact_name", { length: 255 }),
    primary_contact_email: varchar("primary_contact_email", { length: 255 }),
    primary_contact_phone: varchar("primary_contact_phone", { length: 255 }),
    fax_num: varchar("fax_num", { length: 255 }),
    is_primary: boolean("is_primary").notNull().default(false),
    is_active: boolean("is_active").notNull().default(true),
  }
);

export const InventoryProductTable = dbSchema.table("inventory_products", {
  product_id: uuid("product_id").defaultRandom().primaryKey(),
  // type: "Tempered Glass", "Laminated Glass", "Insulated Glass", "Mirror", "Shower Door"
  type: varchar("type", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }),
  alt: varchar("alt", { length: 255 }),
  description: varchar("description", { length: 255 }),
  config_options: jsonb("config_options"),
  date_created: timestamp("date_created", { withTimezone: true }).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).notNull(),
  updated_by: varchar("updated_by").notNull(),
});

export const InventoryGlassTable = dbSchema.table("inventory_glass_item", {
  glass_id: uuid("glass_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  thickness: jsonb("thickness").notNull(), // List of thicknesses
  shapes: jsonb("shapes").notNull(), // list of shape IDs
  tint: jsonb("tint").notNull(), // list of available tints
  // list of products this glass can be used for
  compatible_products: jsonb("compatible_products").notNull(),
  quantity_available: integer("quantity_available").notNull(),
  // quantity_on_premise: integer("quantity"),
  // quantity_on_order: integer("quantity"),
  // supplier_id: uuid("supplier_id").notNull(), // not necessary as a standalone field since it'll be part of supply orders
  quantity_incoming: jsonb("quantity_incoming"),
  date_created: timestamp("date_created", { withTimezone: true }).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).notNull(),
  updated_by: varchar("updated_by").notNull(),
  // name of user instead of id incase user is deleted
  // could add a check constraint to ensure user is ADMIN
});

// one-to-many with user table
// need to differentiate between user entering order and customer the order is for
// user_id is the user who created the order
// customer_id is the customer the order is for
// customer_id can be the same as the user,
// if logged in user is ADMIN, there is customer drop down, otherwise, customer_id is inferred from user_id
export const OrderTable = dbSchema.table(
  "orders",
  {
    order_id: uuid("order_id").defaultRandom().primaryKey(),
    // TODO NOTE: set onDelete action; instead of "cascade," we need to set an action to archive records
    created_by: uuid("created_by")
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    // customer name; auto-populated if entered by a user that is a customer,
    // or it is selected from a dropdown if the user is admin
    customer_id: uuid("customer_id")
      .notNull()
      .references(() => CustomerTable.customer_id, { onDelete: "cascade" }),
    order_name: varchar("order_name", { length: 255 }).notNull(),
    order_number: varchar("order_number", { length: 255 }).notNull(),
    shipping_data: jsonb("shipping_data").notNull(),
    billing_data: jsonb("billing_data").notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    // IMPLEMENTATION NOTE: metadata object for storing additional order details
    // TODO NOTE: refactor timestamp columns into separate ts file to import and spread
    // across multiple tables without having to rewrite
    // https://orm.drizzle.team/docs/sql-schema-declaration
    // TODO NOTE: determine if mode: string is needed
    date_created: timestamp("date_created", { withTimezone: true }).notNull(),
    date_updated: timestamp("date_updated", { withTimezone: true }).notNull(),
    date_submitted: timestamp("date_submitted", { withTimezone: true }),
    date_shipped: timestamp("date_shipped", { withTimezone: true }),
    date_delivered: timestamp("date_delivered", { withTimezone: true }),
  },
  (table) => [
    check(
      "ORDER_STATUS_CHECK",
      sql`${table.status} = '${sql.raw(OrderStatus.Draft)}' OR ${
        table.status
      } = '${sql.raw(OrderStatus.Pending)}' OR ${table.status} = '${sql.raw(
        OrderStatus.Quote
      )}' OR ${table.status} = '${sql.raw(OrderStatus.Processing)}' OR ${
        table.status
      } = '${sql.raw(OrderStatus.Shipped)}' OR ${table.status} = '${sql.raw(
        OrderStatus.Delivered
      )}' OR ${table.status} = '${sql.raw(OrderStatus.Cancelled)}'`
    ),
  ]
);

// one-to-many with order table
export const OrderItemTable = dbSchema.table("order_items", {
  order_item_id: serial("order_item_id").primaryKey(),
  order_id: uuid("order_id")
    .notNull()
    .references(() => OrderTable.order_id, { onDelete: "cascade" }),
  product_type_id: uuid("product_type_id")
    .notNull()
    .references(() => InventoryProductTable.product_id, {
      onDelete: "cascade",
    }),
  product_config: jsonb("product_config").notNull(),
  quantity: integer("quantity").notNull(),
  note: varchar("note", { length: 255 }),
});

export const OrderInvoiceTable = dbSchema.table("order_invoices", {
  order_invoice_id: uuid("order_invoice_id").defaultRandom().primaryKey(),
  created_by: uuid("created_by")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  order_id: uuid("order_id")
    .notNull()
    .references(() => OrderTable.order_id, { onDelete: "cascade" }),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => CustomerTable.customer_id, { onDelete: "cascade" }),
  invoice_number: varchar("invoice_number", { length: 255 }).notNull(),
  // example: "INV" + order_id + date_created
  status: varchar("status", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  date_created: timestamp("date_created", { withTimezone: true }).notNull(),
});
