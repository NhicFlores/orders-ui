import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { ordersSeed } from "../seed-data/seed-orders";
import { orderItemsSeed } from "../seed-data/seed-order-items";
import { orderInvoiceSeed } from "../seed-data/seed-order-invoice";
import { InventoryProductTable, OrderTable } from "@/drizzle/schema";
// import { GetUserEmails, GetUserIds } from "../fetch-queries/get-users";
import { usersSeed } from "../seed-data/seed-users";
import { inventoryProductSeed } from "../seed-data/seed-inventory-products";
import { getSchemaName } from "../utils";
import { GetUserEmails } from "../data/user-queries";

function matchUserId(seedId: string, dbUsers: { user_id: string; email: string }[]) {
  for (const seedUser of usersSeed) {
    if (seedUser.user_id === seedId) {
      for (const dbUser of dbUsers) {
        if (dbUser.email === seedUser.email) {
          return dbUser.user_id;
        }
      }
    }
  }

  //   const mappedUserIds = dbUsers.map((dbUser) => {
  //     for (const seedUser of seedUsers) {
  //       if (dbUser.email === seedUser.email) {
  //         return { dbId: dbUser.id, seedId: seedUser.id };
  //       }
  //     }
  //   });
}

function matchProductId(
  seedId: string,
  dbProducts: { product_id: string; type: string }[]
) {
  for (const seedProduct of inventoryProductSeed) {
    if (seedProduct.product_id === seedId) {
      for (const dbProduct of dbProducts) {
        if (dbProduct.type === seedProduct.type) {
          return dbProduct.product_id;
        }
      }
    }
  }
}

export async function seedOrderInfo() {
  console.log("seeding orders ...");
  const dbUsers = await GetUserEmails();
  const dbProducts = await db
    .select({
      product_id: InventoryProductTable.product_id,
      type: InventoryProductTable.type,
    })
    .from(InventoryProductTable);
  try {
    await db.transaction(async (trx) => {
      console.log("-------- TRANSACTION STARTED --------");
      console.log("");
      for (const order of ordersSeed) {
        console.log("xxxxxx NEW ORDER xxxxxx");

        let userID = matchUserId(order.user_id, dbUsers); // userIds[Math.floor(Math.random() * userIds.length)];

        const { shipping_data, billing_data } = order;
        const shippingInfoData = {
          street: shipping_data.street,
          apt_num: shipping_data.apt_num,
          city: shipping_data.city,
          state: shipping_data.state,
          zip: shipping_data.zip,
          is_job_site: shipping_data.is_job_site,
          note: shipping_data.note,
        };
        const billingInfoData = {
          street: billing_data.street,
          apt_num: billing_data.apt_num,
          city: billing_data.city,
          state: billing_data.state,
          zip: billing_data.zip,
          payment_method: billing_data.payment_method,
          purchase_order: billing_data.purchase_order,
          primary_contact_name: billing_data.primary_contact_name,
          primary_contact_email: billing_data.primary_contact_email,
          primary_contact_phone: billing_data.primary_contact_phone,
          fax_num: billing_data.fax_num,
        };
        const serializedShippingInfo = JSON.stringify(shippingInfoData);
        const serializedBillingInfo = JSON.stringify(billingInfoData);
        const result = await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".orders 
                      ("user_id",
                      "order_name",
                      "shipping_data",
                      "billing_data",
                      status,
                      "date_created",
                      "date_updated",
                      "date_submitted",
                      "date_shipped",
                      "date_delivered")
            VALUES (${userID},
                    ${order.order_name},
                    ${serializedShippingInfo},
                    ${serializedBillingInfo},
                    ${order.status},
                    ${order.date_created},
                    ${order.date_updated},
                    ${order.date_submitted ? order.date_submitted : null},
                    ${order.date_shipped ? order.date_shipped : null},
                    ${order.date_delivered ? order.date_delivered : null})
            RETURNING order_id`
        );

        const orderId = result.rows[0].order_id;
        console.log(`Inserted order with Order ID: ${orderId}`);
        // consoleLogSpacer();
        let itemsCount = 0;
        for (const item of orderItemsSeed) {
          if (order.order_id === item.order_id) {
            console.log("xxx SEEDING ORDER ITEMS xxx");
            itemsCount++;
            let productTypeId = matchProductId(
              item.product_type_id,
              dbProducts
            );

            const serializedProductConfig = JSON.stringify(item.product_config);
            await trx.execute(
              sql`INSERT INTO "${sql.raw(getSchemaName())}".order_items
                                    ("order_id",
                                    "product_type_id",
                                    product_config,
                                    quantity,
                                    note) 
                    VALUES (${orderId},
                            ${productTypeId},
                            ${serializedProductConfig},
                            ${item.quantity},
                            ${item.note})`
            );
          }
        }
        console.log(
          `${itemsCount} Order items seeded for order: ${orderId} successfully`
        );
        // consoleLogSpacer();
        let invoiceCount = 0;
        for (const invoice of orderInvoiceSeed) {
          if (invoice.order_id === order.order_id) {
            console.log("xxx SEEDING INVOICE xxx");
            invoiceCount++;
            await trx.execute(
              sql`INSERT INTO "${sql.raw(getSchemaName())}"."order_invoices"
                            (user_id,
                            order_id,
                            date_created,
                            status,
                            amount)
                    VALUES (${userID},
                            ${orderId},
                            ${invoice.date_created},
                            ${invoice.status},
                            ${invoice.amount})`
            );
          }
        }
        console.log(
          `${invoiceCount} Invoices seeded for order: ${orderId} successfully`
        );
      }
      console.log(`${ordersSeed.length} Orders seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

// export async function seedOrderItems() {
//   console.log("seeding order items ...");
//   try {
//     const orderIds = await db.transaction(async (trx) => {
//       for (const item of orderItemsArray) {
//         const serializedProductConfig = JSON.stringify(item.product_config);
//         await trx.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}".order_items
//                           ("order_id",
//                           "product_type_id",
//                           product_config,
//                           quantity,
//                           note)
//                           VALUES (${item.order_id},
//                                   ${item.product_type_id},
//                                   ${serializedProductConfig},
//                                   ${item.quantity},
//                                   ${item.note})`
//         );
//       }
//       console.log(`${orderItemsArray.length} Order items seeded successfully`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function seedInvoices() {
//   console.log("seeding invoices ...");

//   try {
//     await db.transaction(async (trx) => {
//       for (const invoice of invoicesArray) {
//         await trx.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}"."invoices"
//                           (id,
//                           user_id,
//                           order_id,
//                           date_created,
//                           status,
//                           amount)
//                 VALUES (${invoice.id},
//                         ${invoice.user_id},
//                         ${invoice.order_id},
//                         ${invoice.date_created},
//                         ${invoice.status},
//                         ${invoice.amount})`
//         );
//       }
//       console.log(`${invoicesArray.length} Invoices seeded successfully`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
