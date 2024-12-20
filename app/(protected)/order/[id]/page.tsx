import { OrderDetails } from "@/lib/data-model/data-definitions";
import React from "react";
import { fetchOrderDetailsById } from "../../(tables)/queries";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const orderDetails = await fetchOrderDetailsById(params.id);
  console.log(orderDetails);
  // TODO NOTE: use shadcn Form component to display order details
  return (
    <main className="container mx-auto">
      <section>
        <h1>Order Details</h1>
      </section>
      <section className="flex space-x-2 items-baseline">
        <label className="text-lg">{"Order Name:"}</label>
        <div>{orderDetails.order_name}</div>
      </section>
    </main>
  );
};

export default OrderPage;
