import BillingFormWrapper from "@/app/ui/components/account-components/billing-form-wrapper";
import { auth } from "@/auth";
import { getBillingInfoByCustomerId } from "@/lib/data/customer-data";

async function BillingPage() {
  //NOTE: once the user has multiple payment methods, we will need to create a table with expandable rows to show the details of each payment method
  const session = await auth();
  // const user = await getUserByID(session?.user.id as string);
  const billingData = await getBillingInfoByCustomerId(
    session?.user.id as string
  );
  //console.log(billingData[0])
  //console.log(typeof billingData[0].billing_addr);
  return (
    <main className="lg:w-1/2 sm:w-full border rounded p-4 bg-white">
      <BillingFormWrapper billing_data={billingData} />
    </main>
  );
}

export default BillingPage;
