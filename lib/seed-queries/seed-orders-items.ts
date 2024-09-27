import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { ordersArray } from "../seed-data/orders";
import { orderItemsArray } from "../seed-data/order-items";

export async function SeedOrders() {
  console.log("seeding orders ...");

  try {
    await db.transaction(async (trx) => {
      for (const order of ordersArray) {
        const serializedBillingInfo = JSON.stringify(order.billing_info);
        const serializedShippingInfo = JSON.stringify(order.shipping_info);
        await trx.execute(
          sql`INSERT INTO "prod-orders".orders 
                      (id,
                      "user_id",
                      "order_name",
                      "billing_info",
                      "shipping_info",
                      status,
                      "date_created",
                      "date_updated",
                      "date_submitted")
            VALUES (${order.id},
                    ${order.user_id},
                    ${order.order_name},
                    ${serializedBillingInfo},
                    ${serializedShippingInfo},
                    ${order.status},
                    ${order.date_created},
                    ${order.date_updated},
                    ${order.date_submitted ? order.date_submitted : null})`
        );
      }
      console.log("Orders seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedOrderItems() {
    console.log("seeding order items ..."); 

    try {
        await db.transaction(async (trx) =>{
            for (const item of orderItemsArray) {
                const serializedProductConfig = JSON.stringify(item.product_config);
                await trx.execute(
                    sql`INSERT INTO "prod-orders".order_items
                        (id,
                        "order_id",
                        "product_type_id",
                        product_config,
                        quantity,
                        note) 
                        VALUES (${item.id},
                                ${item.order_id},
                                ${item.product_type_id},
                                ${serializedProductConfig},
                                ${item.quantity},
                                ${item.note})`
                )
            }
            console.log("Order items seeded successfully");
        })
    } catch (error) {
        console.error(error);
    }
}
