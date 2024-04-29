'use client'

import { createOrder } from "@/app/lib/actions";
import { MyButton } from "../my-button";
import Link from "next/link";
import { CustomerField, OrderForm } from "@/app/lib/definitions";
import { useFormState, useFormStatus } from "react-dom";

export default function EditOrderForm({ 
    order, 
    customers 
}: { 
    order: OrderForm; 
    customers: CustomerField[];
}){
  //const initialState = {message: null, errors: {}};
  //const [state, dispatch] = useFormState(createOrder, initialState);  
  
  return(
    <form action={createOrder}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer_id" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer_id"
              name="customer_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
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
        </div>

        {/* Order Name */}
        <div className="mb-4">
          <label htmlFor="order_name" className="mb-2 block text-sm font-medium">
            Choose an order name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="order_name"
                name="order_name"
                type='text'
                placeholder="Enter Order Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Product ID */}
        <div className="mb-4">
          <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
            Choose a product ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="product_id"
                name="product_id"
                type='text'
                placeholder="Enter product ID"
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
                type='number'
                step="1"
                placeholder="0"
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
                type='number'
                step="0.01"
                placeholder="order total"
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
                  type='radio'
                  value="pending"
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
                  value="shipped"
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
    )
}