"use client";
// DEPRECATED
import { updateOrder } from "@/lib/actions/actions";
import { MyButton } from "../my-button";
import Link from "next/link";
import { CustomerField, OrderForm } from "@/lib/definitions/definitions";
import { useFormState, useFormStatus } from "react-dom";
import { OrderStatusOptions } from "@/lib/data-model/enum-types";


export default function EditOrderForm({
  order,
  customers,
}: {
  order: OrderForm;
  customers: CustomerField[];
}) {
  console.log("EDIT ORDER FORM: DEPRECATED");
  const initialState = { message: "", errors: {} };
  const updateOrderWithID = updateOrder.bind(null, order.id);
  const [state, dispatch] = useFormState(updateOrderWithID, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label
            htmlFor="customer_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer_id"
              name="customer_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={order.customer_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          {/*<div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.customer_id && 
                state.errors.customer_id.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
          </div>*/}
        </div>

        {/* Order Name */}
        <div className="mb-4">
          <label
            htmlFor="order_name"
            className="mb-2 block text-sm font-medium"
          >
            Choose an order name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="order_name"
                name="order_name"
                type="text"
                placeholder="Enter Order Name"
                value={order.order_name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Product ID */}
        <div className="mb-4">
          <label
            htmlFor="product_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose a product ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="product_id"
                name="product_id"
                type="text"
                placeholder="Enter product ID"
                value={order.product_id}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* product quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            product quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                step="1"
                placeholder="0"
                value={order.quantity}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Order total */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Order Total
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="order total"
                value={order.price}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Order Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the order status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  checked={order.status === OrderStatusOptions.Pending ? true : false}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="draft"
                  name="status"
                  type="radio"
                  value="draft"
                  checked={order.status === OrderStatusOptions.Draft ? true : false}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="draft"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Draft
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="processing"
                  name="status"
                  type="radio"
                  value="processing"
                  checked={
                    order.status === OrderStatusOptions.Processing ? true : false
                  }
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="processing"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Processing
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="shipped"
                  name="status"
                  type="radio"
                  value="shipped"
                  checked={order.status === OrderStatusOptions.Shipped ? true : false}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="shipped"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Shipped
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/order"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <MyButton type="submit">Submit Order</MyButton>
      </div>
    </form>
  );
}
