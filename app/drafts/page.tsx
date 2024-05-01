//drafts route

import { fetchDraftOrders } from "../lib/data";
import { DataTable } from "../ui/components/data-table";
import { DraftColumns } from "./draft-columns";

export default async function Page() {
    const data = await fetchDraftOrders();
    return (
    <main className="m-5">
        <DataTable columns={DraftColumns} data={data}></DataTable>
    </main>
    );
}