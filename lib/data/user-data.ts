// fetch functions
// fetch functions for users
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { getSchemaName, LogData } from "../utils";
import {
  User,
  UserBillingInformation,
  UserProfile,
  UserShippingInformation,
} from "../definitions/data-model";
import { db } from "@/drizzle/db";
import {
  UserBillingInformationTable,
  UserProfileTable,
  UserShippingInformationTable,
} from "@/drizzle/schema";
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
    console.log("SCHEMA NAME:", schemaName);
    const user =
      await sql<User>`SELECT * FROM "prod-orders".users WHERE id=${id}`;
    console.log("USER:", user.rows[0]);
    // console.log("USER TYPE:", typeof user.rows[0]);
    return user.rows[0]; //as User
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
      id: userProfile.id,
      user_id: userProfile.user_id,
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      company: userProfile.company ?? "",
      account_num: userProfile.account_num ?? "",
      phone_num: userProfile.phone_num ?? "",
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
}

export async function getBillingInfoByUserId(user_id: string) {
  try {
    const result = await db
      .select()
      .from(UserBillingInformationTable)
      .where(eq(UserBillingInformationTable.user_id, user_id));

    console.log("BILLING INFO:", result);
    return result;
    // return billingInfoData.rows.map((row) => {
    //   let billing_addr;
    //   try {
    //     billing_addr =
    //       typeof row.billing_addr === "string"
    //         ? JSON.parse(row.billing_addr)
    //         : row.billing_addr;
    //   } catch (error) {
    //     billing_addr = row.billing_addr;
    //   }
    //   return {
    //     ...row,
    //     billing_addr,
    //   };
    // });
  } catch (error) {
    console.error("Failed to fetch billing info:", error);
    throw new Error("Failed to fetch billing info.");
  }
}

export async function getShippingInfoById(user_id: string) {
  try {
    const result = await db
      .select()
      .from(UserShippingInformationTable)
      .where(eq(UserShippingInformationTable.user_id, user_id));
    console.log("SHIPPING INFO:", result);
    // return shippingInfo.rows.map((row) => {
    //   let delivery_addr;
    //   try{
    //     delivery_addr = JSON.parse(String(row.delivery_addr));
    //   } catch (error) {
    //     delivery_addr = row.delivery_addr;
    //   }
    //   return {
    //     ...row,
    //     delivery_addr
    //   };
    // })
    return result;
  } catch (error) {
    console.error("Failed to fetch shipping info:", error);
    throw new Error("Failed to fetch shipping info.");
  }
}
