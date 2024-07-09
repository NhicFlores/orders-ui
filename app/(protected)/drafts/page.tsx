//drafts route

import { OrderStatus } from "@/lib/definitions/order-definitions";
import { DataTable } from "../../ui/components/data-table";
import { DraftColumns } from "./draft-columns";
import { fetchOrdersByStatus } from "./queries";

export default async function Page() {
  const data = await fetchOrdersByStatus(OrderStatus.Draft);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-10">
        <DataTable columns={DraftColumns} data={data}></DataTable>
      </div>
    </main>
  );
}
