"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ShippingForm from "./shipping-form";

export default function ShippingWrapper() {
  const [isNewShippingInfo, setIsNewShippingInfo] = useState(false);

  function toggleNewShippingForm() {
    setIsNewShippingInfo(!isNewShippingInfo);
  }
  return (
    <div>
      <div className="flex justify-between w-full border-b-2 mb-4">
        <h1 className="text-2xl font-bold">Shipping Options</h1>
        <Button className="mb-1" onClick={toggleNewShippingForm}>
            {isNewShippingInfo ? (
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
        {isNewShippingInfo && (
            <ShippingForm/>
        )}
      </div>
      <div>
        {!isNewShippingInfo && (
            <div>Shipping Table</div>
        )}
      </div>
    </div>
  );
}
