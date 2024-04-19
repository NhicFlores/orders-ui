'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

//updating the data displayed in the orders route, 
//so we need to clear this cache and trigger a new request to the server 
// import revalidateData 

const OrderFormSchema = z.object({
    id: z.string(),
    customer_id: z.string(),
    order_name: z.string(),
    product_id: z.string(),//NOTE TODO: how am i creating the product id 
    quantity: z.coerce.number(),
    price: z.coerce.number(),
    status: z.enum(['pending', 'draft', 'shipped', 'processing']),
    date: z.string(),
});
const CreateOrder = OrderFormSchema.omit({id: true, date: true});

/*
If you're working with forms that have many fields, 
you may want to consider using the entries() method 
with JavaScript's Object.fromEntries(). For example:

const rawFormData = Object.fromEntries(formData.entries())
*/
export async function createOrder(formData: FormData) {
    //const rawFormData =
    
    await sql`
        INSERT INTO 
    `;
}