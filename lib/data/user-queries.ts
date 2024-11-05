import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
// NOTE: deprecated 
export async function GetUserEmails() {
  console.log("---- fetching users ----");

  try {
    const users = await db
      .select({ id: UserTable.id, email: UserTable.email })
      .from(UserTable);
    // console.log(users);
    // const user = users[0] as User;
    // console.log("USER:", user);
    // console.log(typeof user);
    console.log("COUNT: ", users.length);
    for (const user of users) {
      console.log("----");
      console.log(user);
    }
    console.log("Users fetched successfully");
    return users;
  } catch (error) {
    console.error(error);
    return [];
    // initially i thought the return type needed to be specified as Promise<{id: string}[]>,
    // but the actual cause of my user id arrays potentially being
    // undefined where this function was called was due to the missing return
    // in a possible branch of code
  }
}
