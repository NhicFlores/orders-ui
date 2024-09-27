CREATE SCHEMA IF NOT EXISTS "prod-orders";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "prod-orders"."user_role" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."billing_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"address" varchar(255) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "prod-orders"."glass_inventory_item" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"thickness" jsonb NOT NULL,
	"shapes" jsonb NOT NULL,
	"tint" jsonb NOT NULL,
	"compatible_products" jsonb NOT NULL,
	"quantity_available" integer NOT NULL,
	"quantity_incoming" jsonb,
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL,
	"updated_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_type_id" uuid NOT NULL,
	"product_config" jsonb NOT NULL,
	"quantity" integer NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"order_name" varchar(255) NOT NULL,
	"billing_info" jsonb NOT NULL,
	"shipping_info" jsonb NOT NULL,
	"status" varchar(255) NOT NULL,
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL,
	"date_submitted" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"alt" varchar(255),
	"description" varchar(255),
	"config_options" jsonb,
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."shipping_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"is_job_site" boolean DEFAULT false NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"company" varchar(255),
	"account_num" varchar(255),
	"phone_num" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-orders"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "prod-orders"."user_role" DEFAULT 'USER',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."billing_info" ADD CONSTRAINT "billing_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-orders"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."glass_inventory_item" ADD CONSTRAINT "glass_inventory_item_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "prod-orders"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "prod-orders"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."order_items" ADD CONSTRAINT "order_items_product_type_id_products_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "prod-orders"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-orders"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."shipping_info" ADD CONSTRAINT "shipping_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-orders"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-orders"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-orders"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
