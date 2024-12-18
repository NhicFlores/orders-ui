"use server";
import { auth } from "@/auth";
import { BillingRoute, ProfileRoute, ShippingRoute } from "@/routes";
import {
  BillingInfoSchema,
  ProfileSchema,
  ShippingInfoSchema,
  UserSchema,
} from "@/schema/form-schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

async function validateUser() {
  const session = await auth();
  if (!session?.user.id) {
    return redirect("/login");
  }
  return session.user.id;
}

export async function updateUser(
  user_id: string,
  formFields: z.infer<typeof UserSchema>
) {
  console.log("------------------------- updateUser -------------------------");
  const validatedFields = UserSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update User",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await sql`
            UPDATE users
            SET email = ${email}, password = ${password}
            WHERE id = ${user_id}
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to update User",
    };
  }

  //revalidatePath(ProfileRoute.href);//TODO: need to make sure we have the most up to date user info
}

export async function createProfile(
  user_id: string,
  formFields: z.infer<typeof ProfileSchema>
) {
  const validatedFields = ProfileSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Profile",
    };
  }

  const { first_name, last_name, company, account_num, phone_num } =
    validatedFields.data;

  try {
    await sql`
            INSERT INTO user_profiles (user_id, first_name, last_name, company, account_num, phone_num)
            VALUES (${user_id}, ${first_name}, ${last_name}, ${company}, ${account_num}, ${phone_num})
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to create Profile.",
    };
  }
}
// IMPLEMENTATION NOTE: if users are allowed multiple profiles, we need to update by profile_id
export async function updateProfile(
  user_id: string,
  formFields: z.infer<typeof ProfileSchema>
) {
  console.log(
    "------------------------- updateProfile -------------------------"
  );
  const validatedFields = ProfileSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Profile",
    };
  }

  const { first_name, last_name, company, account_num, phone_num } =
    validatedFields.data;

  try {
    await sql`
            UPDATE user_profiles
            SET first_name = ${first_name}, last_name = ${last_name}, company = ${company}, account_num = ${account_num}, phone_num = ${phone_num}
            WHERE user_id = ${user_id}
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to update Profile",
    };
  }
}

export async function deleteProfile(user_id: string) {
  await sql`
        DELETE FROM user_profiles
        WHERE user_id = ${user_id}
    `;
}

/**
 * this function creates a new billing info object in the database
 * @param formFields values from the billing info form
 * @returns
 */
export async function createBillingInfo(
  formFields: z.infer<typeof BillingInfoSchema>,
  pathToRevalidate: string
) {
  const user_id = await validateUser();
  // TODO NOTE: for testing purposes, we should split up the validation into
  // separate function 
  const validatedFields = BillingInfoSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Billing Info",
    };
  }
  console.log("---------------- createBillingInfo -----------------");
  const {
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
  } = validatedFields.data;

  // use JSON.stringify to store the address as a string in the database to properly serialize and deserialize the address object
  // const billing_addr_str = `(${billing_addr.street}, ${billing_addr.apt_num}, ${billing_addr.city}, ${billing_addr.state}, ${billing_addr.zip}, ${billing_addr.country})`;
  // const billing_addr_string = JSON.stringify(billing_addr);

  let billing_info_id;
  try {
    console.log("---------------- updating DB -----------------");
    const queryResult = await sql<{ id: string }>`
        INSERT INTO user_billing_information (
            user_id, 
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
            fax_num
          )
        VALUES (${user_id}, 
            ${street},
            ${apt_num},
            ${city},
            ${state},
            ${zip}, 
            ${payment_method}, 
            ${purchase_order}, 
            ${primary_contact_name}, 
            ${primary_contact_email}, 
            ${primary_contact_phone},  
            ${fax_num})
        RETURNING id;
        `;
    console.log("---------------- updated DB -----------------");
    billing_info_id = queryResult.rows[0].id;
  } catch (error) {
    return {
      id: billing_info_id,
      error: "Database Error: Failed to create Billing Info.",
    };
  }

  revalidatePath(pathToRevalidate);
  return {
    id: billing_info_id,
    success: "Your order has been submitted.",
  };
}

export async function insertBillingInfo() {
  try {
    console.log(
      "---------------- inserting into BillingInfo -----------------"
    );
    await sql`
        INSERT INTO user_billing_information (
            user_id, 
            street,
            apt_num,
            city,
            state,
            zip, 
            payment_method, 
            purchase_order, 
            primary_contact_name, 
            primary_contact_email, 
            primary_contact_phone_num, 
            fax_num
          ) VALUES 
          (
            '53a6eaf2-3f13-448e-a964-f72e1c6d4bd9', 
            (
                '123 Test St', 
                'Apt 1', 
                'New York', 
                'NY', 
                '10001', 
                'USA'
            ), 
            'Credit Card', 
            'PO12345', 
            'John Doe', 
            'john.doe@example.com', 
            '123-456-7890', 
            '098-765-4321', 
            '111-222-3333'
        ),
          ('53a6eaf2-3f13-448e-a964-f72e1c6d4bd9', ('456 Maple Ave', 'Apt 2', 'Los Angeles', 'CA', '90001', 'USA'), 'Debit Card', 'PO23456', 'Jane Smith', 'jane.smith@example.com', '234-567-8901', '109-876-5432', '222-333-4444'),
          ('53a6eaf2-3f13-448e-a964-f72e1c6d4bd9', ('789 Oak Dr', 'Apt 3', 'Chicago', 'IL', '60007', 'USA'), 'PayPal', 'PO34567', 'Bob Johnson', 'bob.johnson@example.com', '345-678-9012', '210-987-6543', '333-444-5555'),
          ('53a6eaf2-3f13-448e-a964-f72e1c6d4bd9', ('012 Pine Rd', 'Apt 4', 'Houston', 'TX', '77001', 'USA'), 'Bank Transfer', 'PO45678', 'Alice Williams', 'alice.williams@example.com', '456-789-0123', '321-098-7654', '444-555-6666'),
          ('53a6eaf2-3f13-448e-a964-f72e1c6d4bd9', ('345 Birch Ln', 'Apt 5', 'Phoenix', 'AZ', '85001', 'USA'), 'Check', 'PO56789', 'Charlie Brown', 'charlie.brown@example.com', '567-890-1234', '432-109-8765', '555-666-7777');
        `;
    console.log("---------------- inserted into BillingInfo -----------------");
  } catch (error) {
    return {
      message: "Database Error: Failed to insert Billing Info.",
    };
  }
}

// INSERT INTO billing_info (
//   user_id,
//   billing_addr,
//   payment_method,
//   purchase_order,
//   primary_contact_name,
//   primary_contact_email,
//   phone_num,
//   alt_phone_num,
//   fax_num
// ) VALUES
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('123 Main St', 'Apt 1', 'New York', 'NY', '10001', 'USA'), 'Credit Card', 'PO12345', 'John Doe', 'john.doe@example.com', '123-456-7890', '098-765-4321', '111-222-3333'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('456 Maple Ave', 'Apt 2', 'Los Angeles', 'CA', '90001', 'USA'), 'Debit Card', 'PO23456', 'Jane Smith', 'jane.smith@example.com', '234-567-8901', '109-876-5432', '222-333-4444'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('789 Oak Dr', 'Apt 3', 'Chicago', 'IL', '60007', 'USA'), 'PayPal', 'PO34567', 'Bob Johnson', 'bob.johnson@example.com', '345-678-9012', '210-987-6543', '333-444-5555'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('012 Pine Rd', 'Apt 4', 'Houston', 'TX', '77001', 'USA'), 'Bank Transfer', 'PO45678', 'Alice Williams', 'alice.williams@example.com', '456-789-0123', '321-098-7654', '444-555-6666'),
// ('14e57592-e422-4da6-be3b-fba670ce498d', ('345 Birch Ln', 'Apt 5', 'Phoenix', 'AZ', '85001', 'USA'), 'Check', 'PO56789', 'Charlie Brown', 'charlie.brown@example.com', '567-890-1234', '432-109-8765', '555-666-7777');

/**
 * function for updating existing billing info object in the database
 * @param user_id current user id
 * @param billing_info_id id of the billing info object to update
 * @param formFields form values
 * @returns
 */
export async function updateBillingInfo(
  billing_info_id: number,
  formFields: z.infer<typeof BillingInfoSchema>
) {
  // console.log("---------------- updateBillingInfo function -----------------");
  const validatedFields = BillingInfoSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Billing Info",
    };
  }

  const session = await auth();
  if (!session?.user.id) {
    return redirect("/login");
  }

  const user_id = session.user.id;

  const {
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
  } = validatedFields.data;

  // const billing_addr_string = JSON.stringify(billing_addr);
  //console.log(typeof billing_info_id);
  try {
    await sql`
            UPDATE user_billing_information
            SET street = ${street},
                apt_num = ${apt_num},
                city = ${city},
                state = ${state},
                zip = ${zip},  
                payment_method = ${payment_method}, 
                purchase_order = ${purchase_order}, 
                primary_contact_name = ${primary_contact_name}, 
                primary_contact_email = ${primary_contact_email}, 
                primary_contact_phone = ${primary_contact_phone}, 
                fax_num = ${fax_num}
            WHERE user_id = ${user_id} AND id = ${billing_info_id}
        `;
    // console.log(
    //   "---------------- updateBillingInfo: updated DB -----------------"
    // );
  } catch (error) {
    return {
      message: "Database Error: Failed to update Billing Info",
    };
  }
  revalidatePath(BillingRoute.href);
}

export async function deleteBillingInfo(billing_info_id: number) {
  const user_id = await validateUser();

  try {
    await sql`
    DELETE FROM user_billing_information
    WHERE user_id = ${user_id} AND id = ${billing_info_id}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to delete Billing Info",
    };
  }
  revalidatePath(BillingRoute.href);
}

/**
 * function for creating a new shipping info object in the database
 * @param formFields form values
 * @returns
 */
export async function createShippingInfo(
  formFields: z.infer<typeof ShippingInfoSchema>
) {
  const user_id = await validateUser();

  const validatedFields = ShippingInfoSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Shipping Info",
    };
  }

  const { street, apt_num, city, state, zip, is_job_site, note } =
    validatedFields.data;
  //console.log("delivery_addr: ", delivery_addr)
  // const delivery_addr_string = JSON.stringify(delivery_addr);
  try {
    await sql`
            INSERT INTO user_shipping_information (user_id, street, apt_num, city, state, zip, is_job_site, note)
            VALUES (${user_id}, 
                ${street},
                ${apt_num},
                ${city},
                ${state},
                ${zip}, 
                ${is_job_site}, 
                ${note})
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to create Shipping Info.",
    };
  }
}

export async function updateShippingInfo(
  shipping_info_id: number,
  formFields: z.infer<typeof ShippingInfoSchema>
) {
  const user_id = await validateUser();

  const validatedFields = ShippingInfoSchema.safeParse(formFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Shipping Info",
    };
  }

  const { street, apt_num, city, state, zip, is_job_site, note } =
    validatedFields.data;
  try {
    await sql`
            UPDATE user_shipping_information
            SET street = ${street},
                apt_num = ${apt_num},
                city = ${city},
                state = ${state},
                zip = ${zip}, 
                is_job_site = ${is_job_site}, 
                note = ${note}
            WHERE user_id = ${user_id} AND id = ${shipping_info_id}
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to update Shipping Info",
    };
  }
}

export async function deleteShippingInfo(shipping_info_id: number) {
  const user_id = await validateUser();
  await sql`
        DELETE FROM user_shipping_information
        WHERE user_id = ${user_id} AND id = ${shipping_info_id}
    `;

  revalidatePath(ShippingRoute.href);
}
