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
    //console.log(billingOptions[0])
    //console.log(typeof billingOptions[0].billing_addr);
  return (
    <div>
      <div>
      { <BillingForm user_id={ user.id} billing_info={billingOptions[0]}/> }
      </div>
      <div>
        {/* <DataTable columns={BillingInfoColumns} data={billingOptions} /> */}
        { <BillingOptionTable columns={BillingInfoColumns} data={billingOptions} /> }
      </div>
    </div>
  );
};

export default BillingFormWrapper;
