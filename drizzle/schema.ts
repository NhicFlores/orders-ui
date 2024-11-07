import { OrderStatus, UserRole } from "@/lib/data-model/schema-definitions";
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


// NOTE TODO: optimize date types - check why drizzle is inferring { mode: string }
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
    user_id: uuid("user_id").defaultRandom().primaryKey(), // need .defaultRandom() for generating UUIDs
    email: varchar("email", { length: 255 }).notNull().unique(),
    // emailVerified: date('emailVerified'),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 255 }).default("USER"),
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
export const UserProfileTable = dbSchema.table(
  "user_profiles", 
  {
    profile_id: serial("profile_id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => UserTable.user_id, { onDelete: "cascade" }),
    first_name: varchar("first_name", { length: 255 }).notNull(),
    last_name: varchar("last_name", { length: 255 }).notNull(),
    company: varchar("company", { length: 255 }),
    account_num: varchar("account_num", { length: 255 }),
    phone_num: varchar("phone_num", { length: 255 }),
    // last login? we need a way to determine inactive users
  }
);

// // one-to-many with user table
export const UserShippingInformationTable = dbSchema.table(
  "user_shipping_information",
  {
    shipping_info_id: serial("shipping_info_id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => UserTable.user_id, { onDelete: "cascade" }),
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
// // one-to-many with user table
export const UserBillingInformationTable = dbSchema.table(
  "user_billing_information",
  {
    billing_info_id: serial("billing_info_id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => UserTable.user_id, { onDelete: "cascade" }),
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

export const InventoryProductTable = dbSchema.table(
  "inventory_products", 
  {
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
  }
);

export const InventoryGlassTable = dbSchema.table(
  "inventory_glass_item", 
  {
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
  }
);

// one-to-many with user table
export const OrderTable = dbSchema.table(
  "orders",
  {
    order_id: uuid("order_id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => UserTable.user_id, { onDelete: "cascade" }),
    order_name: varchar("order_name", { length: 255 }).notNull(),
    shipping_data: jsonb("shipping_data").notNull(),
    billing_data: jsonb("billing_data").notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    // NOTE TODO: determine if mode: string is needed
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
export const OrderItemTable = dbSchema.table(
  "order_items", 
  {
    order_item_id: serial("order_item_id").primaryKey(),
    order_id: uuid("order_id")
      .notNull()
      .references(() => OrderTable.order_id, { onDelete: "cascade" }),
    product_type_id: uuid("product_type_id")
      .notNull()
      .references(() => InventoryProductTable.product_id, { onDelete: "cascade" }),
    product_config: jsonb("product_config").notNull(),
    quantity: integer("quantity").notNull(),
    note: varchar("note", { length: 255 }),
  }
);

export const OrderInvoiceTable = dbSchema.table(
  "order_invoices", 
  {
    order_invoice_id: uuid("order_invoice_id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => UserTable.user_id, { onDelete: "cascade" }),
    order_id: uuid("order_id")
      .notNull()
      .references(() => OrderTable.order_id, { onDelete: "cascade" }),
    date_created: timestamp("date_created", { withTimezone: true }).notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  }
);
