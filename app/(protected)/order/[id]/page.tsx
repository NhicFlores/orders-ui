import { OrderDetails } from "@/lib/data-model/data-definitions";
import React from "react";
import { fetchOrderDetailsById } from "../../(tables)/queries";
import { Form } from "@/components/ui/form";
import OrderForm from "./order-form";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const orderDetails = await fetchOrderDetailsById(params.id);
  console.log(orderDetails);
  // TODO NOTE: use shadcn Form component to display order details
  return (
    <main className="container mx-auto">
      <OrderForm />
    </main>
  ); 
}; 

export default OrderPage;
