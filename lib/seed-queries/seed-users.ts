import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { users } from "@/lib/seed-data/users";
import { profiles } from "@/lib/seed-data/user_profiles";

export async function SeedUsers() {
  console.log("seeding users ...");

  try {
    await db.transaction(async (trx) => {
      //await trx.execute(sql`TRUNCATE TABLE users`);

      //trx.insert(UserTable).values(users).execute();

      for (const user of users) {
        await trx.execute(
          sql`INSERT INTO "prod-orders".users 
                      (id, 
                      email, 
                      password, 
                      role) 
          VALUES (${user.id},
                  ${user.email},
                  ${user.password},
                  ${user.role})`
          //[user.id, user.email, user.password, user.role]
        );
      }
      console.log("Users seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedUserProfiles() {
  console.log("seeding user profiles ...");

  try {
    await db.transaction(async (trx) => {
      for (const profile of profiles) {
        await trx.execute(
          sql`INSERT INTO "prod-orders".user_profiles 
              (id, 
              "user_id", 
              "first_name", 
              "last_name", 
              company, 
              "account_num", 
              "phone_num") 
            VALUES (${profile.id},
                    ${profile.user_id},
                    ${profile.first_name},
                    ${profile.last_name},
                    ${profile.company},
                    ${profile.account_num},
                    ${profile.phone_num})`
        );
      }
      console.log("User profiles seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

// NOTE TODO: check syntax
// test transaction

// async function insertUsers(users: User[]) {
//     try {
//       await db.transaction(async (trx) => {
//         for (const user of users) {
//           await trx.insertInto('users').values({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             password: user.password,
//             date_created: user.date_created,
//             date_updated: user.date_updated,
//           }).execute();
//         }
//       });
//       console.log('Users inserted successfully');
//     } catch (err) {
//       console.error('Error inserting users:', err);
//     }
//   }

//   // Call the function to insert users
//   insertUsers(users).catch((err) => console.error('Error in insertUsers:', err));
