import { fetchCustomers } from "@/app/lib/data";
import DesignForm from "@/app/ui/components/design_dashboard/create-design-form";

export default async function Page() {

    const customers = await fetchCustomers();

    return(
        <main>
            <DesignForm customers={customers}/>
        </main>
    )
}