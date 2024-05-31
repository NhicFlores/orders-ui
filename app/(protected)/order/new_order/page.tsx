import { fetchCustomers } from "@/lib/data/data";
import NewOrderForm from "@/app/ui/components/order-components/new_order_form";
import Container from "@/app/ui/components/page-container";

export default async function Page() {

    const customers = await fetchCustomers();

    return(
        <main>
            <Container>
                <NewOrderForm customers={customers}/>
            </Container>
        </main>
    )
}