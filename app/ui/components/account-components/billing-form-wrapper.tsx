import BillingForm from "@/app/ui/components/account-components/billing-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { BillingOptionTable } from "@/app/ui/components/account-components/billing-option-table";
import { auth } from "@/auth";
import { getBillingInfoById, getUserByID } from "@/lib/data/user-data";
import { DataTable } from "../data-table";
import { BillingInfoColumns } from "./billing-info-columns";

const BillingFormWrapper = async () => {
    const session = await auth();
    const user = await getUserByID(session?.user.id as string);
    const billingOptions = await getBillingInfoById(session?.user.id as string)
    console.log(billingOptions)
  return (
    <div>
      <div className="w-full border-b-2 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Billing Options</h1>
        <Button className="mb-1">
          <PlusIcon size={16} />
          <div className="pl-2">New Payment Option</div>
        </Button>
      </div>
      {/* <BillingForm user_id={ user.id} billing_info={billingOptions[0]}/> */}
      <div>
        {/* <DataTable columns={BillingInfoColumns} data={billingOptions} /> */}
        { <BillingOptionTable columns={BillingInfoColumns} data={billingOptions} /> }
      </div>
    </div>
  );
};

export default BillingFormWrapper;
