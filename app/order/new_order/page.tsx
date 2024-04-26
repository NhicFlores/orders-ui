import { fetchCustomers } from "@/app/lib/data";
import NewOrderForm from "@/app/ui/components/order-components/new_order_form";

export default async function Page() {

    const customers = await fetchCustomers();

    return(
        <main>
            <NewOrderForm customers={customers}/>
        </main>
    )
}