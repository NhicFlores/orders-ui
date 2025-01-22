import ProductHeader from "@/components/product-components/product-header";
import PaymentSection from "./payment-section";
import ShippingSection from "./shipping-section";
import {
  getBillingInfoByCustomerId,
  getShippingInfoByCustomerId,
} from "@/lib/data/customer-data";
import { auth } from "@/auth";

export default async function CheckoutPage() {
  const session = await auth();
  const billingOptions = await getBillingInfoByCustomerId(
    session?.user.id as string
  );
  const shippingOptions = await getShippingInfoByCustomerId(
    session?.user.id as string
  );
  return (
    <main className="container p-4 space-y-4">
      <ProductHeader
        title="Checkout"
        backRoute="/order-summary"
        continueRoute=""
      />
      <div className="border rounded-md bg-white p-4 space-y-4">
        <PaymentSection billingOptions={billingOptions} />
        <ShippingSection shippingOptions={shippingOptions} />
      </div>
    </main>
  );
}
