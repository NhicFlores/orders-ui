import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { usersSeed } from "../seed-data/seed-users";
import { profilesSeed } from "../seed-data/seed-user-profiles";
import { shippingInfoSeed } from "../seed-data/seed-user-shipping-info";
import { billingInfoSeed } from "../seed-data/seed-user-billing-info";
import { getSchemaName } from "../utils";
import bcrypt from "bcrypt";

export async function seedUserInfo() {
  try {
    await db.transaction(async (trx) => {
      console.log("-------- TRANSACTION STARTED --------");
      console.log("");
      let userCount = 0;
      let infoCount = 0;
      // iterate over users array
      console.log("Seeding users...");
      for (const user of usersSeed) {
        console.log("xxxxxx NEW USER xxxxxx");

        userCount++;
        console.log(`x Seeding user ${userCount}...`);
        const seedUserId = user.user_id;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // <{id: string}>
        const result = await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".users 
                      (email, 
                      password, 
                      role) 
          VALUES (${user.email},
                  ${hashedPassword},
                  ${user.role})
          RETURNING user_id`
        );

        const dbUserId = result.rows[0].user_id;
        console.log(`----- Inserted user with seed id: ${user.user_id} -----`);
        console.log(`----- Database generated id: ${dbUserId} -----`);

        // await seedUserProfile(user.id, dbUserId, trx);
        // iterate over profiles array
        for (const profile of profilesSeed) {
          if (seedUserId === profile.user_id) {
            console.log(`x Seeding profile ${userCount}...`);
            await trx.execute(
              sql`INSERT INTO "${sql.raw(getSchemaName())}".user_profiles 
                        ("user_id", 
                        "first_name", 
                        "last_name", 
                        company, 
                        "account_num", 
                        "phone_num") 
                      VALUES (${dbUserId},
                              ${profile.first_name},
                              ${profile.last_name},
                              ${profile.company},
                              ${profile.account_num},
                              ${profile.phone_num})`
            );
            console.log(`Inserted profile for user id: ${dbUserId}`);
          }
        }

        // await seedUserShippingInfo(user.id, newUserId, trx);
        // iterate over shipping info array
        infoCount = 0;
        for (const shippingInfo of shippingInfoSeed) {
          if (seedUserId === shippingInfo.user_id) {
            infoCount++;
            console.log("");
            console.log(`x Seeding shipping info ${infoCount}...`);
            await trx.execute(
              sql`INSERT INTO "${sql.raw(
                getSchemaName()
              )}".user_shipping_information 
                (user_id, 
                street,
                apt_num, 
                city, 
                state, 
                zip, 
                is_job_site, 
                note) 
        VALUES (${dbUserId},
                ${shippingInfo.street},
                ${shippingInfo.apt_num},
                ${shippingInfo.city},
                ${shippingInfo.state},
                ${shippingInfo.zip},
                ${shippingInfo.is_job_site},
                ${shippingInfo.note})`
            );
          }
        }
        console.log(
          `Inserted ${infoCount} shipping info objects for user id: ${dbUserId}`
        );

        // await seedUserBillingInfo(user.id, newUserId, trx);
        // iterate over billing info array
        infoCount = 0;
        for (const billingInfo of billingInfoSeed) {
          if (seedUserId === billingInfo.user_id) {
            infoCount++;
            console.log("");
            console.log(`x Seeding billing info ${infoCount}...`);
            await trx.execute(
              sql`INSERT INTO "${sql.raw(
                getSchemaName()
              )}".user_billing_information 
                (user_id, 
                street,
                apt_num,
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
        VALUES (${dbUserId},
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
          `Inserted ${infoCount} billing info objects for user id: ${dbUserId}`
        );
      }
      console.log(
        `User info for ${usersSeed.length} Users was seeded successfully`
      );
    });
    console.log("-------- TRANSACTION COMPLETED --------");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

// async function seedUserProfile(seedUserId: string, dbUserId: string, trx) {
//   console.log("Seeding user profile...");
//   try {
//     for (const profile of profiles) {
//       if (seedUserId === profile.user_id) {
//         await trx.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}".user_profiles
//                     ("user_id",
//                     "first_name",
//                     "last_name",
//                     company,
//                     "account_num",
//                     "phone_num")
//                   VALUES (${dbUserId},
//                           ${profile.first_name},
//                           ${profile.last_name},
//                           ${profile.company},
//                           ${profile.account_num},
//                           ${profile.phone_num})`
//         );
//         console.log(`Inserted profile for user id: ${dbUserId}`);
//       }
//     }
//     console.log(`${profiles.length} User Profiles seeded successfully`);
//   } catch (error) {
//     console.error("Error seeding user profiles:", error);
//   }
// }

// async function seedUserShippingInfo(seedUserId: string, dbUserId: string) {
//   console.log("Seeding shipping info...");
//   try {
//     for (const shippingInfo of shippingInfoArray) {
//       if (seedUserId === shippingInfo.user_id) {
//         await db.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}".shipping_info
//             (user_id,
//             address,
//             city,
//             state,
//             zip,
//             is_job_site,
//             note)
//     VALUES (${dbUserId},
//             ${shippingInfo.address},
//             ${shippingInfo.city},
//             ${shippingInfo.state},
//             ${shippingInfo.zip},
//             ${shippingInfo.is_job_site},
//             ${shippingInfo.note})`
//         );
//         console.log(`Inserted shipping info for user id: ${dbUserId}`);
//       }
//     }
//     console.log(
//       `${shippingInfoArray.length} Shipping Infos seeded successfully`
//     );
//   } catch (error) {
//     console.error("Error seeding shipping info:", error);
//   }
// }

// async function seedUserBillingInfo(seedUserId: string, dbUserId: string) {
//   console.log("Seeding billing info...");
//   try {
//     for (const billingInfo of billingInfoArray) {
//       if (seedUserId === billingInfo.user_id) {
//         await db.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}".billing_info
//             (user_id,
//             address,
//             city,
//             state,
//             zip,
//             payment_method,
//             purchase_order,
//             primary_contact_name,
//             primary_contact_email,
//             primary_contact_phone,
//             fax_num,
//             is_primary,
//             is_active)
//     VALUES (${dbUserId},
//             ${billingInfo.address},
//             ${billingInfo.city},
//             ${billingInfo.state},
//             ${billingInfo.zip},
//             ${billingInfo.payment_method},
//             ${billingInfo.purchase_order},
//             ${billingInfo.primary_contact_name},
//             ${billingInfo.primary_contact_email},
//             ${billingInfo.primary_contact_phone},
//             ${billingInfo.fax_num},
//             ${billingInfo.is_primary},
//             ${billingInfo.is_active})`
//         );
//         console.log(`Inserted billing info for user id: ${dbUserId}`);
//       }
//     }
//     console.log(`${billingInfoArray.length} Billing Infos seeded successfully`);
//   } catch (error) {
//     console.error("Error seeding billing info:", error);
//   }
// }
