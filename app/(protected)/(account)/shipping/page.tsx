"use server";
import { auth } from "@/auth";
import ShippingContent from "./shipping-content";
import { getShippingInfoById } from "@/lib/data/user-data";

export default async function ShippingPage() {
  const session = await auth();

  const shippingOptions = await getShippingInfoById(session?.user.id as string);

  return (
    <main className="lg:w-1/2 sm:w-full border rounded-md p-4 bg-white">
      <ShippingContent shippingOptions={shippingOptions} />
    </main>
  );
}
