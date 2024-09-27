import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { shippingInfoArray } from "../seed-data/shipping-info";
import { billingInfoArray } from "../seed-data/billing-info";


export const SeedShippingInfo = async () => {
  console.log("seeding shipping info ...");

  try {
    await db.transaction(async (trx) => {
      for (const shippingInfo of shippingInfoArray) {
        await trx.execute(
          sql`INSERT INTO "prod-orders".shipping_info 
                  (id, 
                  user_id, 
                  address, 
                  city, 
                  state, 
                  zip, 
                  is_job_site, 
                  note) 
          VALUES (${shippingInfo.id},
                  ${shippingInfo.user_id},
                  ${shippingInfo.address},
                  ${shippingInfo.city},
                  ${shippingInfo.state},
                  ${shippingInfo.zip},
                  ${shippingInfo.is_job_site},
                  ${shippingInfo.note})`
        );
      }
      console.log("Shipping info seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedBillingInfo() {
    console.log("seeding billing info ...");
    
    try {
        await db.transaction(async (trx) => {
        for (const billingInfo of billingInfoArray) {
          await trx.execute(
            sql`INSERT INTO "prod-orders".billing_info 
                    (id, 
                    user_id, 
                    address, 
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
            VALUES (${billingInfo.id},
                    ${billingInfo.user_id},
                    ${billingInfo.address},
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
        console.log("Billing info seeded successfully");
        });
    } catch (error) {
        console.error(error);
    }
}