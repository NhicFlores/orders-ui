"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDetailSchema } from "@/schema/form-schema";
import { InvoiceField, AllOrderFormFields } from "@/lib/data-model/query-types";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateToLocal } from "@/lib/utils";
import ShippingForm from "../../(account)/shipping/shipping-form";
import BillingForm from "@/app/ui/components/account-components/billing-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  OrderStatusArray,
  OrderStatusOptions,
} from "@/lib/data-model/enum-types";
import Link from "next/link";
import { InvoicePageRoute, NewInvoiceRoute } from "@/routes";

interface OrderDetailFormProps {
  orderDetails?: AllOrderFormFields;
  invoiceFields?: InvoiceField;
}

const OrderForm = ({ orderDetails, invoiceFields }: OrderDetailFormProps) => {
  const orderDetailForm = useForm<z.infer<typeof OrderDetailSchema>>({
    resolver: zodResolver(OrderDetailSchema),
    defaultValues: orderDetails
      ? {
          ...orderDetails,
          shipping_data: {
            ...orderDetails.shipping_data,
            apt_num: orderDetails.shipping_data.apt_num || "",
          },
          billing_data: {
            ...orderDetails.billing_data,
            apt_num: orderDetails.billing_data.apt_num || "",
          },
          date_submitted: orderDetails.date_submitted
            ? new Date(orderDetails.date_submitted)
            : null,
        }
      : {
          created_by: "",
          order_name: "",
          order_number: "",
          shipping_data: {
            street: "",
            apt_num: "",
            city: "",
            state: "",
            zip: "",
            is_job_site: false,
            note: "",
          },
          billing_data: {
            street: "",
            apt_num: "",
            city: "",
            state: "",
            zip: "",
            payment_method: "",
            purchase_order: "",
            primary_contact_name: "",
            primary_contact_email: "",
            primary_contact_phone: "",
            fax_num: "",
          },
          status: OrderStatusOptions.Draft,
          amount: 0,

          // date_created: new Date(),
          // date_updated: new Date(),
          // date_submitted: new Date(),
          // date_shipped: new Date(),
          // date_delivered: new Date(),

          // order_invoice_id: "",
        },
  });

  return (
    <div className="space-y-4">
      <Form {...orderDetailForm}>
        <form>
          <div className="space-y-4">
            <section className="flex justify-between">
              <div>
                <h1 className="text-lg">Order: {orderDetails?.order_number}</h1>
              </div>
              {invoiceFields
                ? InvoiceLink(
                    invoiceFields.invoice_id,
                    invoiceFields.invoice_number
                  )
                : GenerateInvoiceButton(orderDetails?.order_id!)}
            </section>
            <hr className="border-t border-gray-300 my-4" />
            <div className="flex justify-between">
              <FormField
                control={orderDetailForm.control}
                name="order_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="order_number">Order Number</FormLabel>
                    <FormControl>
                      <Input id="order_number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <label
                  htmlFor="order_date"
                  className="text-sm font-medium leading-none"
                >
                  Order Date
                </label>
                <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground">
                  {formatDateToLocal(
                    orderDetails ? orderDetails.date_drafted : new Date()
                  )}
                </div>
              </div>
              <FormField
                control={orderDetailForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Input {...field} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {OrderStatusArray.map((status) => (
                            <DropdownMenuCheckboxItem
                              key={status}
                              checked={field.value === status}
                              onCheckedChange={(value) =>
                                field.onChange(value ? status : "")
                              }
                            >
                              {status}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FieldPlaceholder
                htmlFor="customer_name"
                label="Customer"
                value={
                  orderDetails
                    ? orderDetails.customer_name
                    : "Customer not found"
                }
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={orderDetailForm.control}
                name="order_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="order_name">Order Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={orderDetailForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FieldPlaceholder
                htmlFor="date_submitted"
                label="Order Date"
                value={
                  orderDetails?.date_submitted
                    ? formatDateToLocal(orderDetails.date_submitted)
                    : "NOT SUBMITTED"
                }
              />
              <FieldPlaceholder
                htmlFor="date_shipped"
                label="Ship Date"
                value={
                  orderDetails?.date_shipped
                    ? formatDateToLocal(orderDetails.date_shipped)
                    : "NOT SHIPPED"
                }
              />
              <FieldPlaceholder
                htmlFor="date_delivered"
                label="Delivery Date"
                value={
                  orderDetails?.date_delivered
                    ? formatDateToLocal(orderDetails.date_delivered)
                    : "NOT DELIVERED"
                }
              />
            </div>
          </div>
        </form>
      </Form>
      <div className="flex flex-col space-y-4">
        <div className="space-y-4">
          <Collapsible asChild>
            <div>
              <CollapsibleTrigger asChild>
                <div>
                  <Button variant={"outline"} className="w-full">
                    Shipping Information <ChevronDown />
                  </Button>
                  <hr className="border-t border-gray-300 my-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <ShippingForm shippingInfo={orderDetails?.shipping_data} />
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
        <div>
          <Collapsible asChild>
            <div>
              <CollapsibleTrigger asChild>
                <div>
                  <Button variant={"outline"} className="w-full">
                    Billing Information <ChevronDown />
                  </Button>
                  <hr className="border-t border-gray-300 my-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <BillingForm billing_info={orderDetails?.billing_data} />
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

function FieldPlaceholder({
  htmlFor,
  label,
  value,
}: {
  htmlFor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium leading-none">
        {label}
      </label>
      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground">
        {value}
      </div>
    </div>
  );
}

function FormDivider() {
  return (
    <div>
      <div className="flex border rounded-md">
        Shipping Info <ChevronDown />
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
}

function InvoiceLink(invoiceId: string, invoiceNumber: string) {
  return (
    <div className="flex">
      <Link
        className="flex p-2 group rounded-md border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        href={InvoicePageRoute(invoiceId).href}
      >
        <h1 className="text-lg">Invoice: {invoiceNumber}</h1>
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </Link>
    </div>
  );
}

function GenerateInvoiceButton(orderID: string) {
  return (
    <Link
      className="flex p-2 group rounded-md border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      href={NewInvoiceRoute.href}
    >
      Generate Invoice
    </Link>
  );
}

export default OrderForm;
