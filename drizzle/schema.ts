import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const dbSchema = pgSchema(
  process.env.NODE_ENV === "development"
    ? process.env.DEV_SCHEMA!
    : process.env.PROD_SCHEMA!
);

export const UserRole = dbSchema.enum("user_role", ["ADMIN", "USER"]);

export const UserTable = dbSchema.table("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  // emailVerified: date('emailVerified'),
  password: varchar("password", { length: 255 }).notNull(),
  role: UserRole("role").default("USER"),
});

// one-to-one with user table
export const UserProfileTable = dbSchema.table("user_profiles", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  accountNum: varchar("accountNum", { length: 255 }),
  phoneNum: varchar("phoneNum", { length: 255 }),
});

// one-to-many with user table
export const ShippingInfoTable = dbSchema.table("shipping_info", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  isJobSite: boolean("isJobSite").notNull().default(false),
  note: varchar("note", { length: 255 }),
});
// users can add and delete billing info at any time
// relevant billing info will be serialized and stored in the order table
// one-to-many with user table
export const BillingInfoTable = dbSchema.table("billing_info", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 255 }).notNull(),
  purchaseOrder: varchar("purchaseOrder", { length: 255 }),
  primaryContactName: varchar("primaryContactName", { length: 255 }),
  primaryContactEmail: varchar("primaryContactEmail", { length: 255 }),
  primaryContactPhone: varchar("primaryContactPhone", { length: 255 }),
  faxNum: varchar("faxNum", { length: 255 }),
  isPrimary: boolean("isPrimary").notNull().default(false),
  isActive: boolean("isActive").notNull().default(true),
});

// one-to-many with user table
export const OrderTable = dbSchema.table("orders", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  orderName: varchar("orderName", { length: 255 }).notNull(),
  billingInfo: jsonb("billingInfo").notNull(),
  shippingInfo: jsonb("shippingInfo").notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  dateCreated: timestamp("dateCreated").notNull(),
  dateUpdated: timestamp("dateUpdated").notNull(),
  dateSubmitted: timestamp("dateSubmitted"),
});
// one-to-many with order table
export const OrderItemTable = dbSchema.table("order_items", {
  id: serial("id").primaryKey(),
  orderId: uuid("orderId")
    .notNull()
    .references(() => OrderTable.id, { onDelete: "cascade" }),
  product: jsonb("product").notNull(),
  note: varchar("note", { length: 255 }),
  quantity: integer("quantity").notNull(),
});

// export const ProductTable = dbSchema.table(
//   "products",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 255 }).notNull(),
//     description: varchar("description", { length: 255 }),
//     price: real("price").notNull(),
//     quantity: integer("quantity").notNull(),
//   }
// )
