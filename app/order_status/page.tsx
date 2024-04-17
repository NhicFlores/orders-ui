//order status page
// server component where we will fetch data and render table

//className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"
import Orders_List from "../ui/components/orders_list";
import OrdersList from "../ui/components/OrdersList";
import { order_table_columns } from "./columns";
import { Order } from "../lib/definitions";
import { DataTable } from "../ui/components/data-table";

async function fetchOrders(): Promise<Order[]> {
  //once api layer is made we can move this function over
  return [
    {
      id: "temp",
      customer_id: "customers[0].id",
      order_name: "living room windows",
      product_id: "1234",
      quantity: 5,
      price: 100.0,
      date: "04-16-2024",
      status: "pending",
    },
    {
      id: "temp",
      customer_id: "customers[1].id",
      order_name: "barn door",
      product_id: "1234",
      quantity: 1,
      price: 100.0,
      date: "04-16-2024",
      status: "draft",
    },
    {
      id: "temp",
      customer_id: "customers[2].id",
      order_name: "shower doors",
      product_id: "1234",
      quantity: 5,
      price: 100.0,
      date: "04-16-2024",
      status: "shipped",
    },
  ];
}

export default async function Page() {
  const orders = await fetchOrders();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-10">
        <DataTable columns={order_table_columns} data={orders} />
      </div>
    </main>
  );
}
