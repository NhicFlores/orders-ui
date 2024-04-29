import EditOrderForm from "@/app/ui/components/order-components/edit-order-form";
import { fetchCustomers, fetchOrderById } from "@/app/lib/data";

//declaring prop of type 'params' where 'params' is an object with and id of type string 
export default async function Page({ params }: { params: { id:string } }) {
    const id = params.id;
    const [order, customers] = await Promise.all([
        fetchOrderById(id),
        fetchCustomers()
    ]);

    return (
        <main>
            <EditOrderForm order={order} customers={customers}/>     
        </main>
    );
}