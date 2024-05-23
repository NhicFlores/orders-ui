import BillingForm from "@/app/ui/components/account-components/billing-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import BillingOptionTable from "./billing-option-table";

const BillingFormWrapper = () => {
  return (
    <div>
      <div className="w-full border-b-2 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Billing Options</h1>
        <Button className="mb-1">
          <PlusIcon size={16} />
          <div className="pl-2">New Payment Option</div>
        </Button>
      </div>
      <div>
        <BillingOptionTable/>
      </div>
    </div>
  );
};

export default BillingFormWrapper;
