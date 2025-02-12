"use server";
//order history page
// server component where we will fetch data and render table

//className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"
import { OrderColumns } from "./columns";
import { DataTable } from "../../../ui/components/data-table";
//import { fetchOrders } from "@/lib/data/data";
import { NewOrderButton } from "@/app/ui/components/new-order-button";
import { fetchOrderTableData } from "../queries";

/*async function fetchOrders(): Promise<Order[]> {
  //once api layer is made we can move this function over
  return [
  ];
}*/

export default async function Page() {
  const tableData = await fetchOrderTableData();
  //console.log(typeof(Object.values(OrderStatus) as string[]));
  return (
    <main className="container flex flex-col items-center">
      <div className="flex w-full border-b-2 p-2 items-center justify-between">
        <div className="flex-grow flex justify-center">
          <h1 className="text-2xl font-bold">Order History</h1>
        </div>
        <div className="">
          <NewOrderButton />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={OrderColumns} data={tableData} />
      </div>
    </main>
  );
}

/**
 *         <div className="ml-auto">
          <NewOrderButton />
        </div>
 */
