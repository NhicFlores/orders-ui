"use client";
import BillingForm from "@/app/ui/components/account-components/billing-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { BillingOptionTable } from "@/app/ui/components/account-components/billing-option-table";
import { BillingInfoColumns } from "./billing-info-columns";
import { useState } from "react";
import { UserBillingInformation } from "@/lib/data-model/schema-definitions";

interface BillingFormWrapperProps {
  billing_data: UserBillingInformation[];
}

const BillingFormWrapper = ({ billing_data }: BillingFormWrapperProps) => {
  const [isNewBillingInfo, setIsNewBillingInfo] = useState(false);

  // NOTE TODO: pass this function to the billing form component
  function toggleBillingForm() {
    setIsNewBillingInfo(!isNewBillingInfo);
  }

  return (
    <div>
      <div className="w-full border-b-2 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Billing Options</h1>
        <Button className="mb-1" onClick={toggleBillingForm}>
          {isNewBillingInfo ? (
            <div>View Payment Options</div>
          ) : (
            <div className="flex">
              <PlusIcon size={16} />
              <div className="pl-2">New Payment Option</div>
            </div>
          )}
        </Button>
      </div>
      <div>
        {isNewBillingInfo && (
          <BillingForm
            isBlankForm={isNewBillingInfo}
            toggleBillingForm={toggleBillingForm}
          />
        )}
      </div>
      <div>
        {/* <DataTable columns={BillingInfoColumns} data={billing_data} /> */}
        {!isNewBillingInfo && (
          <BillingOptionTable
            columns={BillingInfoColumns}
            data={billing_data}
          />
        )}
      </div>
    </div>
  );
};

export default BillingFormWrapper;
