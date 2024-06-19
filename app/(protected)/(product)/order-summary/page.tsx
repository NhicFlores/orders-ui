
import OrderSummary from "./order-summary";
import ProductHeader from "@/components/product-components/product-header";
import { TintRoute } from "@/routes";
import { fetchTestOrders } from "@/lib/data/data";

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

export default async function OrderSummaryPage() {
  const testOrders = await fetchTestOrders();
  console.log("---------- Order Summary Page ----------")
  console.log(testOrders);
  //const order_items = testOrders.map((order) => order.order_items);

  return (
    <main className="lg:w-3/4 sm:w-full border rounded-md bg-white p-4 space-y-6">
      <ProductHeader
        title="Order Summary"
        backRoute={TintRoute.href}
        continueRoute=""
      />

      <OrderSummary orderItems={testOrders[1].order_items}/>
    </main>
  );
}
