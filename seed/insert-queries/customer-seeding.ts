import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";
import { customersSeed } from "../data/customers";
import { consoleLogSpacer, getSchemaName } from "@/lib/utils";
import { shippingInfoSeed } from "../data/customer-shipping-info";
import { billingInfoSeed } from "../data/customer-billing-info";


export async function seedCustomerInfo() {
  try {
    await db.transaction(async (trx) => {
      console.log("-------- TRANSACTION STARTED --------");
      console.log("");
      let customerCount = 0;
      let infoCount = 0;

      for (const customer of customersSeed) {
        console.log("xxxxxx NEW CUSTOMER xxxxxx");
        consoleLogSpacer();

        customerCount++;

        console.log(`Seeding customer ${customer.customer_id}...`);
        const seedCustomerId = customer.customer_id;

        const result = await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".customers
                        (customer_id,
                        name,
                        phone,
                        email,
                        type,
                        "account_num",
                        "credit_status",
                        "credit_limit",
                        "date_created",
                        "date_updated")
                    VALUES (${customer.customer_id},
                            ${customer.name},
                            ${customer.phone},
                            ${customer.email},
                            ${customer.type},
                            ${customer.account_num},
                            ${customer.credit_status},
                            ${customer.credit_limit},
                            ${customer.date_created},
                            ${customer.date_updated})
                    RETURNING customer_id`
        );

        const dbCustomerId = result.rows[0].customer_id;
        console.log(`Inserted customer with id: ${dbCustomerId}`);
        consoleLogSpacer();
        infoCount = 0;
        for (const shippingInfo of shippingInfoSeed) {
          if (seedCustomerId === shippingInfo.customer_id) {
            console.log(
              `x Seeding shipping info for customer ${customer.customer_id}...`
            );
            infoCount++;
            await trx.execute(
              sql`INSERT INTO "${sql.raw(
                getSchemaName()
              )}".customer_shipping_information
                                (customer_id,
                                street,
                                "apt_num",
                                city,
                                state,
                                zip,
                                is_job_site,
                                note)
                            VALUES (${dbCustomerId},
                                    ${shippingInfo.street},
                                    ${shippingInfo.apt_num},
                                    ${shippingInfo.city},
                                    ${shippingInfo.state},
                                    ${shippingInfo.zip},
                                    ${shippingInfo.is_job_site},
                                    ${shippingInfo.note})`
            );
            console.log(
              `Inserted shipping info for customer id: ${dbCustomerId}`
            );
          }
        }
        console.log(
          `Inserted ${infoCount} shipping info records for customer id: ${dbCustomerId}`
        );
        consoleLogSpacer();

        console.log(
          `x Seeding billing info for customer ${customer.customer_id}...`
        );
        infoCount = 0;
        for (const billingInfo of billingInfoSeed) {
          if (seedCustomerId === billingInfo.customer_id) {
            infoCount++;
            await trx.execute(
              sql`INSERT INTO "${sql.raw(
                getSchemaName()
              )}".customer_billing_information
                                (customer_id,
                                street,
                                "apt_num",
                                city,
                                state,
                                zip, 
                                payment_method,
                                purchase_order,
                                primary_contact_name,
                                primary_contact_email,
                                primary_contact_phone,
                                fax_num,
                                is_primary,
                                is_active)
                            VALUES (${dbCustomerId},
                                    ${billingInfo.street},
                                    ${billingInfo.apt_num},
                                    ${billingInfo.city},
                                    ${billingInfo.state},
                                    ${billingInfo.zip},
                                    ${billingInfo.payment_method},
                                    ${billingInfo.purchase_order},
                                    ${billingInfo.primary_contact_name},
                                    ${billingInfo.primary_contact_email},
                                    ${billingInfo.primary_contact_phone},
                                    ${billingInfo.fax_num},
                                    ${billingInfo.is_primary},
                                    ${billingInfo.is_active})`
            );
          }
        }
        console.log(
          `Inserted ${infoCount} billing info records for customer id: ${dbCustomerId}`
        );
      }
      console.log(`${customerCount} Customers seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}
