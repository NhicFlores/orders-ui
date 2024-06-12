"use client";
import BillingForm from "@/app/ui/components/account-components/billing-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { BillingOptionTable } from "@/app/ui/components/account-components/billing-option-table";
import { auth } from "@/auth";
import { getBillingInfoByUserId, getUserByID } from "@/lib/data/user-data";
import { DataTable } from "../data-table";
import { BillingInfoColumns } from "./billing-info-columns";
import { BillingInfoDB } from "@/lib/definitions/profile-definitions";
import { useState } from "react";

interface BillingFormWrapperProps {
  user_id: string;
  billing_data: BillingInfoDB[];
}

const BillingFormWrapper = ({
  user_id,
  billing_data,
}: BillingFormWrapperProps) => {
  const [isNewBillingInfo, setIsNewBillingInfo] = useState(false);

  // NOTE TODO: pass this function to the billing form component
  function toggleNewBillingForm() {
    setIsNewBillingInfo(!isNewBillingInfo);
  }

  return (
    <div>
      <div className="w-full border-b-2 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Billing Options</h1>
        <Button className="mb-1" onClick={toggleNewBillingForm}>
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
          <BillingForm user_id={user_id} isNewForm={isNewBillingInfo} />
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
