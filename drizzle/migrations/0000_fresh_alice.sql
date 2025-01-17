CREATE SCHEMA IF NOT EXISTS "dev-schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."customer_billing_information" (
	"billing_info_id" serial PRIMARY KEY NOT NULL,
	"customer_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"apt_num" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"payment_method" varchar(255) NOT NULL,
	"purchase_order" varchar(255),
	"primary_contact_name" varchar(255),
	"primary_contact_email" varchar(255),
	"primary_contact_phone" varchar(255),
	"fax_num" varchar(255),
	"is_primary" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."customer_shipping_information" (
	"shipping_info_id" serial PRIMARY KEY NOT NULL,
	"customer_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"apt_num" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"is_job_site" boolean DEFAULT false NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."customers" (
	"customer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255),
	"type" varchar(255) NOT NULL,
	"account_num" varchar(255),
	"credit_status" varchar(255),
	"credit_limit" numeric(10, 2),
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	CONSTRAINT "customers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."inventory_glass_item" (
	"glass_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"thickness" jsonb NOT NULL,
	"shapes" jsonb NOT NULL,
	"tint" jsonb NOT NULL,
	"compatible_products" jsonb NOT NULL,
	"quantity_available" integer NOT NULL,
	"quantity_incoming" jsonb,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"updated_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."inventory_products" (
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"alt" varchar(255),
	"description" varchar(255),
	"config_options" jsonb,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"updated_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."order_invoices" (
	"order_invoice_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"invoice_number" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"date_created" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."order_items" (
	"order_item_id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_type_id" uuid NOT NULL,
	"product_config" jsonb NOT NULL,
	"quantity" integer NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."orders" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"order_name" varchar(255) NOT NULL,
	"order_number" varchar(255) NOT NULL,
	"shipping_data" jsonb NOT NULL,
	"billing_data" jsonb NOT NULL,
	"status" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"date_submitted" timestamp with time zone,
	"date_shipped" timestamp with time zone,
	"date_delivered" timestamp with time zone,
	CONSTRAINT "ORDER_STATUS_CHECK" CHECK ("orders"."status" = 'DRAFT' OR "orders"."status" = 'PENDING' OR "orders"."status" = 'QUOTE' OR "orders"."status" = 'PROCESSING' OR "orders"."status" = 'SHIPPED' OR "orders"."status" = 'DELIVERED' OR "orders"."status" = 'CANCELLED')
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."user_profiles" (
	"profile_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone_num" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'USER',
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "USER_ROLE_CHECK" CHECK ("users"."role" = 'ADMIN' OR "users"."role" = 'USER')
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."customer_billing_information" ADD CONSTRAINT "customer_billing_information_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customers"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."customer_shipping_information" ADD CONSTRAINT "customer_shipping_information_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customers"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoices" ADD CONSTRAINT "order_invoices_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "dev-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoices" ADD CONSTRAINT "order_invoices_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "dev-schema"."orders"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoices" ADD CONSTRAINT "order_invoices_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customers"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_items" ADD CONSTRAINT "order_items_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "dev-schema"."orders"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_items" ADD CONSTRAINT "order_items_product_type_id_inventory_products_product_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "dev-schema"."inventory_products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."orders" ADD CONSTRAINT "orders_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "dev-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."orders" ADD CONSTRAINT "orders_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customers"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "dev-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
