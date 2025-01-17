// fetch functions
// fetch functions for users

import {
  CustomerBillingInformation,
  CustomerShippingInformation,
} from "../data-model/schema-definitions";
import { db } from "@/drizzle/db";
import {
  CustomerBillingInformationTable,
  CustomerShippingInformationTable,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getBillingInfoByCustomerId(customerId: string) {
  try {
    const result = await db
      .select()
      .from(CustomerBillingInformationTable)
      .where(eq(CustomerBillingInformationTable.customer_id, customerId));

    console.log("BILLING INFO:", result);
    return result as CustomerBillingInformation[];
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

export async function getShippingInfoByCustomerId(customerId: string) {
  try {
    const result = await db
      .select()
      .from(CustomerShippingInformationTable)
      .where(eq(CustomerShippingInformationTable.customer_id, customerId));
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
    return result as CustomerShippingInformation[];
  } catch (error) {
    console.error("Failed to fetch shipping info:", error);
    throw new Error("Failed to fetch shipping info.");
  }
}
