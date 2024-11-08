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
import { UserBillingInformation } from "@/lib/data-model/schema-definitions";
import { useState } from "react";

interface PaymentSectionProps {
  billingOptions: UserBillingInformation[];
}

export default function PaymentSection({
  billingOptions,
}: PaymentSectionProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedBillingOption, setSelectedBillingOption] =
    useState<UserBillingInformation>();
  const [formData, setFormData] = useState<UserBillingInformation>();

  const { setOrder } = useProductContext();

  function handleNewPaymentButtonClicked() {
    setFormData(undefined);
    if (!showPaymentForm) {
      setShowPaymentForm(true);
    }
  }

  function toggleBillingForm() {
    selectedBillingOption
      ? setFormData(selectedBillingOption)
      : setShowPaymentForm(!showPaymentForm);
  }

  const handlePaymentOptionChange = (value: string) => {
    const newSelectedBillingOption = billingOptions.find(
      (billingOption) => billingOption.billing_info_id === Number(value)
    );

    setSelectedBillingOption(newSelectedBillingOption);
    setFormData(newSelectedBillingOption);
    // null or undefined are falsy values, however, not null doesn't mean it's truthy so we need to use !! to convert it to a boolean
    // the first '!' will convert it to a boolean and the second '!' will negate it, turning it to true when the value isn't null
    setShowPaymentForm(!!newSelectedBillingOption);

    newSelectedBillingOption &&
      setOrder((prevOrder) => ({
        ...prevOrder,
        billing_info_id: newSelectedBillingOption,
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
              <div key={billingOption.billing_info_id}>
                <SelectItem value={String(billingOption.billing_info_id)}>
                  <div>
                    <div>{billingOption.purchase_order}</div>
                    <div>
                      {billingOption.street}
                      {billingOption.apt_num && billingOption.apt_num}
                      {billingOption.city}
                    </div>
                  </div>
                </SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleNewPaymentButtonClicked}>
          New Payment Option
        </Button>
      </div>
      {showPaymentForm && (
        <BillingForm
          key={formData?.billing_info_id}
          isBlankForm={!formData}
          billing_info={formData}
          toggleBillingForm={toggleBillingForm}
        />
      )}
    </div>
  );
}
