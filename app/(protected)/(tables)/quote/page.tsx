//quote route
import { DataTable } from "@/app/ui/components/data-table";
import { OrderColumns } from "../orders/columns";
import { getOrderDetailsByStatus } from "../queries";
import { OrderStatus } from "@/lib/data-model/data-definitions";

export default async function Page() {
  const data = await getOrderDetailsByStatus(OrderStatus.Quote);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-10">
        <DataTable columns={OrderColumns} data={data} />
      </div>
    </main>
  );
}
