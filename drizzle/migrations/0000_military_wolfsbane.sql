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
	"purchase_order" varchar(255) NOT NULL,
	"primary_contact_name" varchar(255) NOT NULL,
	"primary_contact_email" varchar(255) NOT NULL,
	"primary_contact_phone" varchar(255) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "dev-schema"."customer" (
	"customer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"account_num" varchar(255) NOT NULL,
	"credit_status" varchar(255) NOT NULL,
	"credit_limit" numeric(10, 2) NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	CONSTRAINT "customer_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."inventory_glass_item" (
	"glass_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"thickness" jsonb NOT NULL,
	"shapes" jsonb NOT NULL,
	"tint" jsonb NOT NULL,
	"compatible_products" jsonb NOT NULL,
	"quantity_available" integer NOT NULL,
	"quantity_incoming" jsonb NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"updated_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."inventory_product" (
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"alt" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"config_options" jsonb NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"updated_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."order_invoice" (
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
CREATE TABLE IF NOT EXISTS "dev-schema"."order_item" (
	"order_item_id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_type_id" uuid NOT NULL,
	"product_config" jsonb NOT NULL,
	"quantity" integer NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."order" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"order_name" varchar(255) NOT NULL,
	"order_number" varchar(255) NOT NULL,
	"shipping_data" jsonb NOT NULL,
	"billing_data" jsonb NOT NULL,
	"status" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"date_drafted" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"date_submitted" timestamp with time zone,
	"date_shipped" timestamp with time zone,
	"date_delivered" timestamp with time zone,
	CONSTRAINT "ORDER_STATUS_CHECK" CHECK ("order"."status" = 'DRAFT' OR "order"."status" = 'PENDING' OR "order"."status" = 'QUOTE' OR "order"."status" = 'PROCESSING' OR "order"."status" = 'SHIPPED' OR "order"."status" = 'DELIVERED' OR "order"."status" = 'CANCELLED')
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."user_profile" (
	"profile_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone_num" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'USER' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "USER_ROLE_CHECK" CHECK ("user"."role" = 'ADMIN' OR "user"."role" = 'USER')
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."customer_billing_information" ADD CONSTRAINT "customer_billing_information_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customer"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."customer_shipping_information" ADD CONSTRAINT "customer_shipping_information_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customer"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoice" ADD CONSTRAINT "order_invoice_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "dev-schema"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoice" ADD CONSTRAINT "order_invoice_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "dev-schema"."order"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoice" ADD CONSTRAINT "order_invoice_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customer"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_item" ADD CONSTRAINT "order_item_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "dev-schema"."order"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_item" ADD CONSTRAINT "order_item_product_type_id_inventory_product_product_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "dev-schema"."inventory_product"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order" ADD CONSTRAINT "order_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "dev-schema"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order" ADD CONSTRAINT "order_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "dev-schema"."customer"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "dev-schema"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
