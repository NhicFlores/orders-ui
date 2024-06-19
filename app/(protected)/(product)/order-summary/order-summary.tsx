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
import { createTestOrder } from "@/lib/actions/actions";
import {
  GlassConfiguration,
  Order,
  TestConfig,
  TestOrder,
} from "@/lib/definitions/definitions";
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

interface orderSummaryProps {
  orderItems: TestConfig[];
}

export default function OrderSummary({ orderItems }: orderSummaryProps) {
  const { summaryCard } = useProductContext();
  const { orderSpec } = summaryCard;

  function descriptionFormatter() {
    return (
      <div>
        <p>{orderSpec.glassThickness}&quot;</p>
        <p>{orderSpec.glassColor}</p>
        <p>{orderSpec.glassType}</p>
      </div>
    );
  }

  function dimensionsFormatter() {
    return (
      <div>
        <p>{orderSpec.glassSize}</p>
      </div>
    );
  }
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
            <TableRow>
              <TableCell>{descriptionFormatter()}</TableCell>
              <TableCell>{dimensionsFormatter()}</TableCell>
              <TableCell>Fabrication Options</TableCell>
              <TableCell>
                <QuantitySelector />
              </TableCell>
            </TableRow>
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
    </div>
  );
}
