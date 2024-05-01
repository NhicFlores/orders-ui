//drafts route

import { fetchDraftOrders } from "../lib/data";
import { DataTable } from "../ui/components/data-table";
import { DraftColumns } from "./draft-columns";

export default async function Page() {
    const data = await fetchDraftOrders();
    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto py-10">
            <DataTable columns={DraftColumns} data={data}></DataTable>
        </div>
    </main>
    );
}