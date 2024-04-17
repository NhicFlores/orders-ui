import React from "react";
import { Order, OrderKeys } from "@/app/lib/definitions";

export default function OrdersList() {
  const orders: Order[] = [
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
  const column: string[] = Object.keys({} as Record<OrderKeys, any>);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {column.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <th key={index}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.order_name}</td>
              <td>{order.product_id}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </th>
          ))}
        </tbody>
      </table>
    </div>
  );
}
