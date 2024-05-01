//order history page
// server component where we will fetch data and render table

//className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"
import { OrderColumns } from "./columns";
import { DataTable } from "../ui/components/data-table";
import { fetchOrders } from "../lib/data";
import { OrderStatus } from "../lib/definitions/definitions";

/*async function fetchOrders(): Promise<Order[]> {
  //once api layer is made we can move this function over
  return [
  ];
}*/

export default async function Page() {
  const orders = await fetchOrders();
  //console.log(typeof(Object.values(OrderStatus) as string[]));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-10">
        <DataTable columns={OrderColumns} data={orders} />
      </div>
    </main>
  );
}