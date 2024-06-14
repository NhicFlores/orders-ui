"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";

export default function OrderSummary() {
  const { order } = useProductContext();
  return (
    <section className="border rounded-md my-4">
      <div className="flex justify-between border-r">
        <div className="bg-slate-100 w-full">
          <h2 className="border p-4">Description</h2>
          <div className="bg-white border p-4">{order.order_name}</div>
        </div>
        <header className="bg-slate-100 w-full">
          <h2 className="border p-4">Dimensions</h2>
          <div className="bg-white border p-4">order dimensions 1</div>
        </header>
        <header className="bg-slate-100 w-full">
          <h2 className="border p-4">Fabrication</h2>
          <div className="bg-white border p-4">order fab 1</div>
        </header>
        <header className="bg-slate-100">
          <h2 className="border p-4">Quantity</h2>
          <div className="bg-white border p-4">1</div>
        </header>
      </div>
    </section>
  );
}
