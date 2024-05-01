//quote route

import { fetchQuote } from "../lib/data";
import { DataTable } from "../ui/components/data-table";
import { QuoteColumns } from "./quote-columns";
import { OrderColumns } from "../order/columns";

export default async function Page() {
    const data = await fetchQuote();
    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto py-10">
            <DataTable columns={QuoteColumns} data={data}/>
        </div>
    </main>
    );
}