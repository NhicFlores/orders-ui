"use client";
import { Button } from "@/components/ui/button";
import OrderSummary from "./order-summary";
import ProductHeader from "@/components/product-components/product-header";
import { GlassTypeRoute, TintRoute } from "@/routes";
import { createTestOrder } from "@/lib/actions/actions";
import { useProductContext } from "@/components/product-components/product-context-provider";
import Link from "next/link";

const newOrder = {
  order_name: "Test Order 1",
  order_items: [
    {
      glass_type: "glass type",
      glass_shape: "glass shape",
      glass_dimensions: "glass dimensions",
      glass_thickness: "glass thickness",
      glass_tint: "glass tint",
      fabrication_options: "fabrication options",
      glass_options: "glass options",
      quantity: 1,
    },
    {
      glass_type: "glass 2",
      glass_shape: "glass shape 2",
      glass_dimensions: "glass dimensions 2",
      glass_thickness: "glass thickness",
      glass_tint: "glass tint",
      fabrication_options: "fabrication options",
      glass_options: "glass options",
      quantity: 2,
    },
  ],
  status: "Draft",
};

export default function OrderSummaryPage() {
  const { order, setOrder, summaryCard, setSummaryCard } = useProductContext();

  const { orderName, orderSpec, productQuantity } = summaryCard;

  return (
    <main className="lg:w-3/4 sm:w-full border rounded-md bg-white p-4 space-y-6">
      <ProductHeader
        title="Order Summary"
        backRoute={TintRoute.href}
        continueRoute=""
      />
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">{newOrder.order_name}</h1>
        <Button onClick={() => createTestOrder(newOrder)}>
          Submit Order/Quote
        </Button>
      </div>
      <OrderSummary orderDescription={orderSpec} />
      <div className="flex justify-between">
        <Link href={GlassTypeRoute.href}>
          <Button>Add Item</Button>
        </Link>
        <Button>Save Draft</Button>
      </div>
    </main>
  );
}
