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
import { ShippingInfo } from "@/lib/definitions/profile-definitions";
import { useProductContext } from "@/components/product-components/product-context-provider";

interface ShippingSectionProps {
  shippingOptions: ShippingInfo[];
}

export default function ShippingSection({
  shippingOptions,
}: ShippingSectionProps) {
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<ShippingInfo>();
  const [formData, setFormData] = useState<ShippingInfo>();
  const [isJobSite, setIsJobSite] = useState(false);

  const { order, setOrder } = useProductContext();

  function handleNewShippingButtonClicked() {
    setFormData(undefined);
    if (!showShippingForm) {
      setShowShippingForm(true);
    }
  }

  function toggleShippingForm() {
    selectedShippingOption
      ? setFormData(selectedShippingOption)
      : setShowShippingForm(!showShippingForm);
  }

  function handleCheckBoxClick() {
    //NOTE TODO: populate shipping form with billing address
    const shipping = {
      delivery_addr: order.billing_info_id.billing_addr,
      is_job_site: false,
      note: "",
    };
    setSelectedShippingOption(shipping);
    setFormData(shipping);
    setShowShippingForm(!!shipping);
  }

  function handleShippingOptionChange(value: string) {
    const newSelectedShippingOption = shippingOptions.find(
      (shippingOption) => shippingOption.id === Number(value)
    );

    setSelectedShippingOption(newSelectedShippingOption);
    setFormData(newSelectedShippingOption);
    setShowShippingForm(!!newSelectedShippingOption);

    newSelectedShippingOption &&
      setOrder((prevOrder) => ({
        ...prevOrder,
        //NOTE POTENTIAL BUG: currently being saved without id from backend
        //not sure that we really care since this is a simple object we
        //can deserialize and we only need the id's to be able to query the db
        //for the shipping options table
        shipping_info: newSelectedShippingOption,
      }));
  }

  function handleJobSiteClick() {
    setIsJobSite(!isJobSite);
    setFormData((prevFormData) => ({
      ...prevFormData,
      is_job_site: !prevFormData?.is_job_site,
    }));
  }

  return (
    <div className="border rounded p-4 space-y-4">
      <div className="text-lg font-bold">Enter Shipping Address</div>
      <div className="flex items-center gap-2">
        <Checkbox onClick={handleCheckBoxClick} />
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
                      <div>shipping option</div>
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
        <Button onClick={handleNewShippingButtonClicked}>
          New Shipping Address
        </Button>
      </div>
      {showShippingForm && (
        <ShippingForm
          key={formData?.id}
          shippingInfo={formData}
          isBlankForm={!formData}
          toggleShippingForm={toggleShippingForm}
        />
      )}
    </div>
  );
}
