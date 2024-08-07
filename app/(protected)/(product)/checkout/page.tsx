import ProductHeader from "@/components/product-components/product-header";
import PaymentSection from "./payment-section";
import ShippingSection from "./shipping-section";
import { getBillingInfoByUserId } from "@/lib/data/user-data";
import { auth } from "@/auth";

export default async function CheckoutPage() {

    const session = await auth();
    const billingOptions = await getBillingInfoByUserId(session?.user.id as string);

  return (
    <main className="container p-4 space-y-4">
      <ProductHeader
        title="Checkout"
        backRoute="/order-summary"
        continueRoute=""
      />
      <div className="border rounded-md bg-white p-4 space-y-4">
        <PaymentSection user_id={session?.user.id as string} billingOptions={billingOptions}/>
        <ShippingSection />
      </div>
    </main>
  );
}
