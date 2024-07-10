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

  const { order, setOrder } = useProductContext();

  const handlePaymentOptionChange = (value: string) => {
    const selectedBillingOption = billingOptions.find(
      (billingOption) => billingOption.id === Number(value)
    );
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
        <Button onClick={() => setShowPaymentForm(!showPaymentForm)}>
          Add Payment Option
        </Button>
      </div>
      {showPaymentForm && <BillingForm isNewForm={showPaymentForm} />}
    </div>
  );
}
