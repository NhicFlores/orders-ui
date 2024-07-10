// fetch functions
// fetch functions for users
import { sql } from "@vercel/postgres";
import { User } from "@/lib/definitions/auth-definitions";
import { unstable_noStore as noStore } from "next/cache";
import {
  BillingInfoDB,
  ShippingInfoDB,
  UserProfile,
} from "@/lib/definitions/profile-definitions";

export async function getUserByID(id: string) {
  // noStore();
  // NOTE what's the difference between typing the sql statement
  // return and casting the value in the return statement
  try {
    const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0]; //as User
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserProfileById(user_id: string) {
  try {
    const userProfile = await sql<UserProfile>`
      SELECT * FROM user_profile 
      WHERE user_id=${user_id}`;

    return userProfile.rows[0];
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
}

export async function getBillingInfoByUserId(user_id: string) {
  try {
    const billingInfoData = await sql<BillingInfoDB>`
      SELECT * FROM billing_info 
      WHERE user_id=${user_id}
    `;

    //console.log(billingInfoData.rows[0]);
    //console.log( typeof billingInfoData.rows[0].billing_addr);
    return billingInfoData.rows.map((row) => {
      let billing_addr;
      try {
        billing_addr =
          typeof row.billing_addr === "string"
            ? JSON.parse(row.billing_addr)
            : row.billing_addr;
      } catch (error) {
        billing_addr = row.billing_addr;
      }
      return {
        ...row,
        billing_addr,
      };
    });
  } catch (error) {
    console.error("Failed to fetch billing info:", error);
    throw new Error("Failed to fetch billing info.");
  }
}

export async function getShippingInfoById(user_id: string) {
  try {
    const shippingInfo = await sql<ShippingInfoDB>`
      SELECT * FROM shipping_info 
      WHERE user_id=${user_id}`;

    return shippingInfo.rows.map((row) => {
      let delivery_addr;
      try{
        delivery_addr = JSON.parse(String(row.delivery_addr));
      } catch (error) {
        delivery_addr = row.delivery_addr;
      }
      return {
        ...row,
        delivery_addr
      };
    })
  } catch (error) {
    console.error("Failed to fetch shipping info:", error);
    throw new Error("Failed to fetch shipping info.");
  }
}
