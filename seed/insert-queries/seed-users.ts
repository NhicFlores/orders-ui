import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import bcrypt from "bcrypt";
import { consoleLogSpacer, getSchemaName } from "@/lib/utils";
import { usersSeed } from "../data/users";
import { profilesSeed } from "../data/user-profiles";

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
        consoleLogSpacer();
        userCount++;
        console.log(`x Seeding user ${userCount}...`);
        const seedUserId = user.id;

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const result = await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".user 
                      (email, 
                      password, 
                      role,
                      "is_active") 
          VALUES (${user.email},
                  ${hashedPassword},
                  ${user.role},
                  ${user.is_active})
          RETURNING id`
        );
        const dbUserId = result.rows[0].id;
        console.log(`Inserted user with id: ${dbUserId}`);
        consoleLogSpacer();

        // iterate over profiles array
        for (const profile of profilesSeed) {
          if (seedUserId === profile.user_id) {
            console.log(`x Seeding profile ${userCount}...`);
            await trx.execute(
              sql`INSERT INTO "${sql.raw(getSchemaName())}".user_profile 
                        ("user_id", 
                        "first_name", 
                        "last_name", 
                        "phone_num") 
                      VALUES (${dbUserId},
                              ${profile.first_name},
                              ${profile.last_name},
                              ${profile.phone_num})`
            );
            console.log(`Inserted profile for user id: ${dbUserId}`);
          }
        }
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
