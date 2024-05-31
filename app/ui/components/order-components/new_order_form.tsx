'use client';

import { createOrder } from "@/lib/actions/actions";
import { MyButton } from "../my-button";
import Link from "next/link";
import { CustomerField, OrderStatus } from "@/lib/definitions/definitions";
import { useFormState, useFormStatus } from "react-dom";

export default function NewOrderForm({ customers }: {customers: CustomerField[]}){
  //server side validation setup 
  //initial state can be anything - here we are creat an object with two empty keys: message and errors 
  const initialState = {message: "", errors: {}};
  const [state, dispatch] = useFormState(createOrder, initialState);  
  //{/** continue with aria labels and state */}
  return(
    <form action={dispatch}>
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
              aria-describedby='customer-error'
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
          <div id="customer-error" aria-live='polite' aria-atomic='true'>
            {state.errors?.customer_id && 
              state.errors.customer_id.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
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
                aria-describedby="order_name-error"
              />
            </div>
            <div id='order_name-error' aria-live='polite' aria-atomic='true'>
              {/* conditionaly rendering for validation error */}
              {state.errors?.order_name && 
                state.errors.order_name?.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
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
                aria-describedby="product_id-error"
              />
            </div>
            <div id='product_id-error' aria-live='polite' aria-atomic='true'>
              {/* conditionaly rendering for validation error */}
              {state.errors?.product_id && 
                state.errors.product_id?.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
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
                aria-describedby="quantity-error"
              />
            </div>
            <div id='quantity-error' aria-live='polite' aria-atomic='true'>
              {/* conditionaly rendering for validation error */}
              {state.errors?.quantity && 
                state.errors.quantity?.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
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
                aria-describedby="price-error"
              />
            </div>
            <div id='price-error' aria-live='polite' aria-atomic='true'>
              {/* conditionaly rendering for validation error */}
              {state.errors?.price && 
                state.errors.price?.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
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
                  value={OrderStatus.Pending}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
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
                  value={OrderStatus.Draft}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
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
                  value={OrderStatus.Processing}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
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
                  value={OrderStatus.Shipped}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="shipped"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Shipped
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="quote"
                  name="status"
                  type="radio"
                  value={OrderStatus.Quote}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="quote"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Quote
                </label>
              </div>
            </div>
          </div>
          <div id='status-error' aria-live='polite' aria-atomic='true'>
                {state.errors?.status && 
                  state.errors.status.map((error: string) => (
                    <p className='mt-2 text-sm text-red-500' key={error}>
                      {error}
                    </p>
                  ))}
          </div>
        </fieldset>
        {state.message && 
          <p className='mt-2 text-sm text-red-500'>
            {state.message}
          </p>
        }
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <MyButton className="mt-4 w-full" aria-disabled={pending}>
      Submit Order
    </MyButton>

  )
}