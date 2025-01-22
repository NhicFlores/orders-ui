// fetch functions
// fetch functions for users
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { getSchemaName } from "../utils";
import { User } from "../data-model/schema-definitions";
import { db } from "@/drizzle/db";
import { UserProfileTable, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const schemaName = getSchemaName(); //process.env.NODE_ENV === "production" ? process.env.PROD_SCHEMA : process.env.DEV_SCHEMA;

export async function getUserByID(id: string) {
  // noStore();
  // NOTE what's the difference between typing the sql statement
  // return and casting the value in the return statement

  console.log("USER-DATA.TS - getUserByID()");
  // LogData({
  //   fileName: "user-data.ts",
  //   functionName: "getUserByID",
  //   params: { id },
  // })

  try {
    // console.log("SCHEMA NAME:", schemaName);
    const result = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, id));
    // console.log("USER QUERY RESULT:", result);
    // console.log("USER TYPE:", typeof user.rows[0]);

    return result[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserProfileById(user_id: string) {
  try {
    const result = await db
      .select()
      .from(UserProfileTable)
      .where(eq(UserProfileTable.user_id, user_id));

    // console.log("USER PROFILE:", result);

    const userProfile = result[0];

    return {
      profile_id: userProfile.profile_id,
      user_id: userProfile.user_id,
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      phone_num: userProfile.phone_num ?? "",
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
}
