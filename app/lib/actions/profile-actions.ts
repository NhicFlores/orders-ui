'use server';
import { ProfileRoute } from "@/routes";
import { BillingInfoSchema, ProfileSchema, ShippingInfoSchema, UserSchema } from "@/schema/form-schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateUser(user_id: string, formFields: z.infer<typeof UserSchema>){
    console.log("------------------------- updateUser -------------------------");
    const validatedFields = UserSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update User',
        }
    }

    const {email, name} = validatedFields.data;

    try {
        await sql`
            UPDATE users
            SET email = ${email}, name = ${name}
            WHERE id = ${user_id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to update User'
        }
    }

    //revalidatePath(ProfileRoute.href);//TODO: need to make sure we have the most up to date user info 
}

export async function createProfile(user_id: string, formFields: z.infer<typeof ProfileSchema>){
    const validatedFields = ProfileSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Profile',
        }
    }

    const {company, account_num, phone_num} = validatedFields.data;

    try {
        await sql`
            INSERT INTO user_profile (user_id, company, account_num, phone_num)
            VALUES (${user_id}, ${company}, ${account_num}, ${phone_num})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create Profile.',
        };
    }
}
//NOTE TODO: if users are allowed multiple profiles, we need to update by profile_id
export async function updateProfile(user_id: string, formFields: z.infer<typeof ProfileSchema>){
    console.log("------------------------- updateProfile -------------------------");
    const validatedFields = ProfileSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update Profile',
        }
    }

    const {company, account_num, phone_num} = validatedFields.data;

    try {
        await sql`
            UPDATE user_profile
            SET company = ${company}, account_num = ${account_num}, phone_num = ${phone_num}
            WHERE user_id = ${user_id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to update Profile'
        }
    }
}

export async function deleteProfile(user_id: string){
    await sql`
        DELETE FROM user_profile
        WHERE user_id = ${user_id}
    `;
}

export async function createBillingInfo(user_id: string, formFields: z.infer<typeof BillingInfoSchema>){
    const validatedFields = BillingInfoSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Billing Info',
        }
    }

    const {billing_addr_prim, billing_addr_sec, payment_method, purchase_order, additional_info, primary_contact_name, primary_contact_email, phone_num, alt_phone_num, fax_num} = validatedFields.data;

    try {
        await sql`
            INSERT INTO billing_info (user_id, billing_addr_prim, billing_addr_sec, payment_method, purchase_order, additional_info, primary_contact_name, primary_contact_email, phone_num, alt_phone_num, fax_num)
            VALUES (${user_id}, 
                ${billing_addr_prim.city, billing_addr_prim.state, billing_addr_prim.zip, billing_addr_prim.country, billing_addr_prim.county}, 
                ${billing_addr_sec?.city, billing_addr_sec?.state, billing_addr_sec?.zip, billing_addr_sec?.country, billing_addr_sec?.county}, 
                ${payment_method}, 
                ${purchase_order}, 
                ${additional_info}, 
                ${primary_contact_name}, 
                ${primary_contact_email}, 
                ${phone_num}, 
                ${alt_phone_num}, 
                ${fax_num})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create Billing Info.',
        };
    }
}

export async function updateBillingInfo(user_id: string, billing_info_id: string, formFields: z.infer<typeof BillingInfoSchema>){
    const validatedFields = BillingInfoSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update Billing Info',
        }
    }

    const {billing_addr_prim, billing_addr_sec, payment_method, purchase_order, additional_info, primary_contact_name, primary_contact_email, phone_num, alt_phone_num, fax_num} = validatedFields.data;

    try {
        await sql`
            UPDATE billing_info
            SET billing_addr_prim = ${billing_addr_prim.city, billing_addr_prim.state, billing_addr_prim.zip, billing_addr_prim.country, billing_addr_prim.county}, 
                billing_addr_sec = ${billing_addr_sec?.city, billing_addr_sec?.state, billing_addr_sec?.zip, billing_addr_sec?.country, billing_addr_sec?.county}, 
                payment_method = ${payment_method}, 
                purchase_order = ${purchase_order}, 
                additional_info = ${additional_info}, 
                primary_contact_name = ${primary_contact_name}, 
                primary_contact_email = ${primary_contact_email}, 
                phone_num = ${phone_num}, 
                alt_phone_num = ${alt_phone_num}, 
                fax_num = ${fax_num}
            WHERE user_id = ${user_id} AND id = ${billing_info_id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to update Billing Info'
        }
    }
}

export async function deleteBillingInfo(user_id: string, billing_info_id: string){
    await sql`
        DELETE FROM billing_info
        WHERE user_id = ${user_id} AND id = ${billing_info_id}
    `;
}

export async function createShippingInfo(user_id: string, formFields: z.infer<typeof ShippingInfoSchema>){
    const validatedFields = ShippingInfoSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Shipping Info',
        }
    }

    const {delivery_addr, is_job_site, note} = validatedFields.data;

    try {
        await sql`
            INSERT INTO shipping_info (user_id, delivery_addr, is_job_site, note)
            VALUES (${user_id}, 
                ${delivery_addr.city, delivery_addr.state, delivery_addr.zip, delivery_addr.country, delivery_addr.county}, 
                ${is_job_site}, 
                ${note})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create Shipping Info.',
        };
    }
}

export async function updateShippingInfo(user_id: string, shipping_info_id: string, formFields: z.infer<typeof ShippingInfoSchema>){
    const validatedFields = ShippingInfoSchema.safeParse(formFields);

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update Shipping Info',
        }
    }

    const {delivery_addr, is_job_site, note} = validatedFields.data;

    try {
        await sql`
            UPDATE shipping_info
            SET delivery_addr = ${delivery_addr.city, delivery_addr.state, delivery_addr.zip, delivery_addr.country, delivery_addr.county}, 
                is_job_site = ${is_job_site}, 
                note = ${note}
            WHERE user_id = ${user_id} AND id = ${shipping_info_id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to update Shipping Info'
        }
    }
}

export async function deleteShippingInfo(user_id: string, shipping_info_id: string){
    await sql`
        DELETE FROM shipping_info
        WHERE user_id = ${user_id} AND id = ${shipping_info_id}
    `;
}