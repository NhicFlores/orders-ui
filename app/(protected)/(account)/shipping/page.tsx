"use server";
import { auth } from "@/auth";
import ShippingContent from "./shipping-content";
import { getShippingInfoByCustomerId } from "@/lib/data/customer-data";

export default async function ShippingPage() {
  const session = await auth();

  const shippingOptions = await getShippingInfoByCustomerId(
    session?.user.id as string
  );

  return (
    <main className="lg:w-1/2 sm:w-full border rounded-md p-4 bg-white">
      <ShippingContent shippingOptions={shippingOptions} />
    </main>
  );
}
