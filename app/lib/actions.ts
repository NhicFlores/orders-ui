'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
const CreateOrder = OrderFormSchema.omit({id: true, date: true, order_name: true, product_id: true, price: true, });

/*
If you're working with forms that have many fields, 
you may want to consider using the entries() method 
with JavaScript's Object.fromEntries(). For example:

const rawFormData = Object.fromEntries(formData.entries())
*/

// this is temporary untul @types/react-dom is updated
export type OrderFormState = {
    errors?: {
        customer_id?: string[];
        quantity?: string[];
        status?: string[];
    };
    message?: string | null;
};

//prevState: OrderFormState,

export async function createOrder(formData: FormData) {
    //const rawFormData =

    // const { customer_id, order_name, product_id, quantity, price, status } = CreateOrder.parse({
    //     customer_id: formData.get('customer_id'),
    //     order_name: formData.get('order_name'),
    //     product_id: formData.get('product_id'),
    //     quantity: formData.get('quantity'),
    //     price: formData.get('price'),
    //     status: formData.get('status'),
    // });

    const customer_id = '3958dc9e-742f-4377-85e9-fec4b6a6442a';
    const order_name = 'new order';
    const product_id = 'some product';
    const quantity = 45;
    const price = 14120.00;
    const status = 'shipped';
    const date = new Date().toISOString().split('T')[0];
    


    await sql`
        INSERT INTO orders (customer_id, order_name, product_id, quantity, price, status, date)
        VALUES (${customer_id}, ${order_name}, ${product_id}, ${quantity}, ${price}, ${status}, ${date})
    `;

    revalidatePath('/order');
    redirect('/order');
}

export async function deleteOrder(id: string){
    await sql`
        DELETE FROM orders
        WHERE id = ${id}
    `;
    revalidatePath('/app/order_status');
}