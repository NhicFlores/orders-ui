"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlassTypeRoute } from "@/routes";
import Link from "next/link";

function QuantitySelector() {
  const { updateOrderItemQuantity } = useProductContext();

  function handleChange(value: string) {
    updateOrderItemQuantity(Number(value));
  }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="">
        <SelectValue placeholder="1" />
      </SelectTrigger>
      <SelectContent position="popper" className="">
        {[...Array(200)].map((_, i) => (
          <SelectItem key={i} value={String(i + 1)}>
            {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function OrderSummary() {
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  // console.log("Order Summary Component Rendered");
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");

  const { orderItem, orderItems, setOrderItems } =
    useProductContext();

  console.log("---------- Order Summary Component ----------");
  console.log("---------- order items array ----------");
  console.log(orderItems);
  //console.log(typeof orderItems);
  console.log("---------- order item ----------")
  console.log(orderItem);
  return (
    <div className="space-y-6">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Order Name</h1>
        <Button>Submit Order/Quote</Button>
      </div>
      <section className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead>Fabrication</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>{item.thickness}&quot;</p>
                  <p>{item.tint}</p>
                  <p>{item.type}</p>
                </TableCell>
                <TableCell>
                  <p>{orderItem.dimensions}</p>
                </TableCell>
                <TableCell>{item.fabrication_options}</TableCell>
                <TableCell>
                  <QuantitySelector />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>12</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
      <div className="flex justify-between">
        <Link href={GlassTypeRoute.href}>
          <Button>Add Item</Button>
        </Link>
        <Button>Save Draft</Button>
      </div>
      {orderItems.length > 0 && (
        <div className="border rounded-md p-4">
          <p>Order Items: {orderItems.length}</p>
          <p className="border-b">order item fields</p>
          <p>{orderItems[0].type}</p>
          <p>{orderItems[0].shape}</p>
          <p>{orderItems[0].dimensions}</p>
          <p>{orderItems[0].thickness}</p>
          <p>{orderItems[0].tint}</p>
          <p>{orderItems[0].quantity}</p>
        </div>
      )}
    </div>
  );
}
