//quote route

import { fetchQuote } from "@/lib/data/data";
import { DataTable } from "@/app/ui/components/data-table";
import { QuoteColumns } from "./quote-columns";
import { fetchOrdersByStatus } from "../queries";
import { OrderStatus } from "@/lib/data-model/schema-definitions";

export default async function Page() {
  const data = await fetchOrdersByStatus(OrderStatus.Quote);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-10">
        <DataTable columns={QuoteColumns} data={data} />
      </div>
    </main>
  );
}
