"use server";
import React from "react";
import OrderForm from "./order-form";
import { ItemTable } from "./item-table";
import { columns } from "./order-item-columns";
import {
  fetchCustomers,
  fetchOrderById,
  fetchAllOrderFormFieldsById,
  fetchOrderInvoiceField,
  fetchOrderItems,
  fetchOrderCustomerObject,
} from "./queries";
/**
 * uses order id to fetch corresponding order, invoice, customer, and items data
 * @param param0 order id from url
 * @returns order page component with order, customer, invoice, and items data
 */
const OrderPage = async ({ params }: { params: { id: string } }) => {
  const orderDetails = await fetchAllOrderFormFieldsById(params.id);
  // const order = await fetchOrderById(params.id);
  // const orderInvoiceId = await fetchOrderInvoiceNumber(params.id);
  // const orderItems = await fetchOrderItems(params.id);
  const [order, orderInvoiceField, orderItems, customers] = await Promise.all([
    fetchOrderById(params.id),
    fetchOrderInvoiceField(params.id),
    fetchOrderItems(params.id),
    fetchCustomers(),
  ]);
  // const orderCustomer = await fetchOrderCustomerObject(
  //   params.id,
  //   order.customer_id
  // );
  // console.log(orderDetails);
  // fetch order, fetch order invoice id and number, fetch order items array
  // scrollable item summary section
  // table or list
  // readable config
  // delete server action
  return (
    <main className="container mx-auto my-4 space-y-4">
      <OrderForm
        orderDetails={orderDetails}
        invoiceFields={orderInvoiceField}
      />
      <div>
        <h2 className="text-lg">Items</h2>
        <hr className="border-t border-gray-300 my-4" />
        <ItemTable columns={columns} data={orderItems} />
      </div>
    </main>
  );
};

export default OrderPage;
