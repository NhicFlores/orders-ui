"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ShippingForm from "./shipping-form";
import { ShippingTable } from "./shipping-table";
import { ShippingColumns } from "./shipping-columns";
import { UserShippingInformation } from "@/lib/definitions/data-model";

interface ShippingContentProps {
  shippingOptions: UserShippingInformation[];
}

export default function ShippingContent({ shippingOptions }: ShippingContentProps) {
  const [showShippingForm, setShowShippingForm] = useState(false);

  function toggleShippingForm() {
    setShowShippingForm(!showShippingForm);
  }
  return (
    <div>
      <div className="flex justify-between w-full border-b-2 mb-4">
        <h1 className="text-2xl font-bold">Shipping Options</h1>
        <Button className="mb-1" onClick={toggleShippingForm}>
          {showShippingForm ? (
            <div>View Shipping Options</div>
          ) : (
            <div className="flex">
              <PlusIcon size={16} />
              <div className="pl-2">New Shipping Option</div>
            </div>
          )}
        </Button>
      </div>
      <div>
        {showShippingForm && (
          <ShippingForm isBlankForm toggleShippingForm={toggleShippingForm} />
        )}
      </div>
      <div>{!showShippingForm && <ShippingTable columns={ShippingColumns} data={shippingOptions}/>}</div>
    </div>
  );
}
