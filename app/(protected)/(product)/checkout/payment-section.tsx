"use client";
import BillingForm from "@/app/ui/components/account-components/billing-form";
import { useProductContext } from "@/components/product-components/product-context-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillingInfoDB } from "@/lib/definitions/profile-definitions";
import { useState } from "react";

interface PaymentSectionProps {
  billingOptions: BillingInfoDB[];
}

export default function PaymentSection({
  billingOptions,
}: PaymentSectionProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedBillingOption, setSelectedBillingOption] = useState<BillingInfoDB>();

  const { setOrder } = useProductContext();

  function toggleBlankPaymentForm() {
    setSelectedBillingOption(undefined);
    if(!showPaymentForm) {
      setShowPaymentForm(true);
    }
  }

  const handlePaymentOptionChange = (value: string) => {
    
    const selectedBillingOption = billingOptions.find(
      (billingOption) => billingOption.id === Number(value)
    );
    
    setSelectedBillingOption(selectedBillingOption);
    // null or undefined are falsy values, however, not null doesn't mean it's truthy so we need to use !! to convert it to a boolean
    // the first '!' will convert it to a boolean and the second '!' will negate it, turning it to true when the value isn't null 
    setShowPaymentForm(!!selectedBillingOption);

    setOrder((prevOrder) => ({
      ...prevOrder,
      billing_info_id: value,
    }));
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="text-lg font-bold">Enter Payment Option</div>
      <div className="flex space-x-2">
        <Select onValueChange={handlePaymentOptionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Option" />
          </SelectTrigger>
          <SelectContent>
            {billingOptions.map((billingOption) => (
              <div key={billingOption.id}>
                <SelectItem value={String(billingOption.id)}>
                  <div>
                    <div>{billingOption.purchase_order}</div>
                    <div>
                      {billingOption.billing_addr.street}
                      {billingOption.billing_addr.apt_num &&
                        billingOption.billing_addr.apt_num}
                      {billingOption.billing_addr.city}
                    </div>
                  </div>
                </SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={toggleBlankPaymentForm}>
          Add Payment Option
        </Button>
      </div>
      {showPaymentForm && <BillingForm key={selectedBillingOption?.id} isBlankForm={!selectedBillingOption} billing_info={selectedBillingOption}/>}
    </div>
  );
}
