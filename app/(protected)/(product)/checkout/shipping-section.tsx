"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ShippingForm from "../../(account)/shipping/shipping-form";
import { ShippingInfoDB } from "@/lib/definitions/profile-definitions";
import { useProductContext } from "@/components/product-components/product-context-provider";

interface ShippingSectionProps {
  shippingOptions: ShippingInfoDB[];
}

export default function ShippingSection({
  shippingOptions,
}: ShippingSectionProps) {
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption ] = useState<ShippingInfoDB>();

  const { setOrder } = useProductContext();

  function toggleShippingForm() {
    setShowShippingForm(!showShippingForm);
  }

  function handleShippingOptionChange(value: string) {

    const newSelectedShippingOption = shippingOptions.find(
      (shippingOption) => shippingOption.id === Number(value)
    );
    
    setSelectedShippingOption(newSelectedShippingOption);
    setShowShippingForm(!!newSelectedShippingOption);

    setOrder((prevOrder) => ({
      ...prevOrder,
      shipping_info: newSelectedShippingOption as ShippingInfoDB,
    }));
  }

  return (
    <div className="border rounded p-4 space-y-4">
      <div className="text-lg font-bold">Enter Shipping Address</div>
      <div className="flex items-center gap-2">
        <Checkbox />
        <div>Same as billing address</div>
      </div>
      <div className="flex space-x-2">
        <Select onValueChange={handleShippingOptionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Shipping Address" />
          </SelectTrigger>
          <SelectContent>
            {shippingOptions.length > 0 ? (
              shippingOptions.map((shippingOption) => (
                <div key={shippingOption.id}>
                  <SelectItem value={String(shippingOption.id)}>
                    <div>
                      <div>
                        shipping option
                      </div>
                      <div>
                        {shippingOption.delivery_addr?.street}
                        {shippingOption.delivery_addr?.apt_num &&
                          shippingOption.delivery_addr?.apt_num}
                        {shippingOption.delivery_addr?.city}
                      </div>
                      <div>{shippingOption.is_job_site && "Job Site"}</div>
                    </div>
                  </SelectItem>
                </div>
              ))
            ) : (
              <div>No shipping addresses found</div>
            )}
          </SelectContent>
        </Select>
        <Button onClick={toggleShippingForm}>Add Shipping Address</Button>
      </div>
      {showShippingForm && <ShippingForm key={selectedShippingOption?.id} shippingInfo={selectedShippingOption} isBlankForm={!selectedShippingOption} toggleShippingForm={toggleShippingForm}/>}
    </div>
  );
}
