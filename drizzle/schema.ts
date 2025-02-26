import {
  OrderStatusOptions,
  UserRoleOptions,
} from "@/lib/data-model/enum-types";
import { BillingFields, ShippingFields } from "@/lib/data-model/utility-types";
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
  "user",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(), // need .defaultRandom() for generating UUIDs
    email: varchar("email", { length: 255 }).notNull().unique(),
    // emailVerified: date('emailVerified'),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 255 }).default("USER").notNull(),
    // at the end of day, a script runs to move records of deactivated users to
    // archive db
    is_active: boolean("is_active").notNull().default(true).notNull(),
  },
  (table) => [
    check(
      "USER_ROLE_CHECK",
      sql`${table.role} = '${sql.raw(UserRoleOptions.Admin)}' OR ${
        table.role
      } = '${sql.raw(UserRoleOptions.User)}'`
    ),
  ]
);
// user profile and and user tables could be one table, but the profile is
// more likely to change, so if i keep them separate, the user
// table, which has credentials, is less likely to need modification
// one-to-one with user table
export const UserProfileTable = dbSchema.table("user_profile", {
  profile_id: serial("profile_id").primaryKey().notNull(),
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

export const CustomerTable = dbSchema.table("customer", {
  customer_id: uuid("customer_id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  // type: individual, business, non-profit, gov, etc
  type: varchar("type", { length: 255 }).notNull(),
  account_num: varchar("account_num", { length: 255 }).unique().notNull(),
  credit_status: varchar("credit_status", { length: 255 }).notNull(),
  credit_limit: decimal("credit_limit", { precision: 10, scale: 2 }).notNull(),
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
    shipping_info_id: serial("shipping_info_id").primaryKey().notNull(),
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
    billing_info_id: serial("billing_info_id").primaryKey().notNull(),
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
    purchase_order: varchar("purchase_order", { length: 255 }).notNull(),
    primary_contact_name: varchar("primary_contact_name", {
      length: 255,
    }).notNull(),
    primary_contact_email: varchar("primary_contact_email", {
      length: 255,
    }).notNull(),
    primary_contact_phone: varchar("primary_contact_phone", {
      length: 255,
    }).notNull(),
    fax_num: varchar("fax_num", { length: 255 }),
    is_primary: boolean("is_primary").notNull().default(false),
    is_active: boolean("is_active").notNull().default(true),
  }
);

export const InventoryProductTable = dbSchema.table("inventory_product", {
  product_id: uuid("product_id").defaultRandom().primaryKey().notNull(),
  // type: "Tempered Glass", "Laminated Glass", "Insulated Glass", "Mirror", "Shower Door"
  type: varchar("type", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
  alt: varchar("alt", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  config_options: jsonb("config_options").notNull(),
  date_created: timestamp("date_created", { withTimezone: true }).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).notNull(),
  updated_by: varchar("updated_by").notNull(),
});

export const InventoryGlassTable = dbSchema.table("inventory_glass_item", {
  glass_id: uuid("glass_id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  thickness: jsonb("thickness").notNull(), // List of thicknesses
  shapes: jsonb("shapes").notNull(), // list of shape IDs
  tint: jsonb("tint").notNull(), // list of available tints
  // list of products this glass can be used for
  compatible_products: jsonb("compatible_products").notNull(),
  quantity_available: integer("quantity_available").notNull(),
  // quantity_on_premise: integer("quantity"),
  // quantity_on_order: integer("quantity"),
  // supplier_id: uuid("supplier_id").notNull(), // not necessary as a standalone field since it'll be part of supply orders
  quantity_incoming: jsonb("quantity_incoming").notNull(),
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
// maybe add an order type in case we need to process or split some orders differently on the backend
// naming conventions: plural vs singular
export const OrderTable = dbSchema.table(
  "order",
  {
    order_id: uuid("order_id").defaultRandom().primaryKey().notNull(),
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
    shipping_data: jsonb("shipping_data").$type<ShippingFields>().notNull(),
    billing_data: jsonb("billing_data")
      .$type<BillingFields>()
      .notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    // IMPLEMENTATION NOTE: metadata object for storing additional order details
    // TODO NOTE: refactor timestamp columns into separate ts file to import and spread
    // across multiple tables without having to rewrite
    // https://orm.drizzle.team/docs/sql-schema-declaration
    // TODO NOTE: determine if mode: string is needed
    // TODO NOTE: date_created is only useful for drafts. date_submitted is used for pending orders
    // date_created field name should be updated to date_drafted
    // date_quoted may be useful for tracking purposes
    date_drafted: timestamp("date_drafted", { withTimezone: true }).notNull(),
    date_updated: timestamp("date_updated", { withTimezone: true }).notNull(),
    date_submitted: timestamp("date_submitted", { withTimezone: true }),
    date_shipped: timestamp("date_shipped", { withTimezone: true }),
    date_delivered: timestamp("date_delivered", { withTimezone: true }),
  },
  (table) => [
    check(
      "ORDER_STATUS_CHECK",
      sql`${table.status} = '${sql.raw(OrderStatusOptions.Draft)}' OR ${
        table.status
      } = '${sql.raw(OrderStatusOptions.Pending)}' OR ${
        table.status
      } = '${sql.raw(OrderStatusOptions.Quote)}' OR ${
        table.status
      } = '${sql.raw(OrderStatusOptions.Processing)}' OR ${
        table.status
      } = '${sql.raw(OrderStatusOptions.Shipped)}' OR ${
        table.status
      } = '${sql.raw(OrderStatusOptions.Delivered)}' OR ${
        table.status
      } = '${sql.raw(OrderStatusOptions.Cancelled)}'`
    ),
  ]
);

// one-to-many with order table
// will need indexes on order_id
export const OrderItemTable = dbSchema.table("order_item", {
  order_item_id: serial("order_item_id").primaryKey().notNull(),
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

  // change all date_created fields to date_updated fields
  // date sent to customer 
  // invoice_date: Date;
  // date paid by customer 
  // date_paid: Date;
export const OrderInvoiceTable = dbSchema.table("order_invoice", {
  order_invoice_id: uuid("order_invoice_id")
    .defaultRandom()
    .primaryKey()
    .notNull(),
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
