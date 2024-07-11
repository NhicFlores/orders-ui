"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BillingInfoSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import {
  createBillingInfo,
  insertBillingInfo,
  updateBillingInfo,
} from "@/lib/actions/profile-actions";
import { BillingInfo, BillingInfoDB } from "@/lib/definitions/profile-definitions";

interface BillingFormProps {
  billing_info?: BillingInfoDB;
  isBlankForm?: boolean;
  toggleBillingForm?: () => void;
}

const BillingForm = ({
  billing_info,
  isBlankForm,
  toggleBillingForm,
}: BillingFormProps) => {
  const [isEditEnabled, setIsEditEnabled] = useState(isBlankForm);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  function ToggleEditEnabled() {
    setIsEditEnabled(!isEditEnabled);
  }

  const {
    id = -1,
    billing_addr = {
      street: "",
      apt_num: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    payment_method = "",
    purchase_order = "",
    primary_contact_name = "",
    primary_contact_email = "",
    phone_num = "",
    alt_phone_num = "",
    fax_num = "",
  } = billing_info ? billing_info : {};

  const { street, apt_num, city, state, zip, country } = billing_addr;

  const billingForm = useForm<z.infer<typeof BillingInfoSchema>>({
    resolver: zodResolver(BillingInfoSchema),
    defaultValues: {
      billing_addr: {
        street: street,
        apt_num: apt_num,
        city: city,
        state: state,
        zip: zip,
        country: country,
      },
      payment_method: payment_method,
      purchase_order: purchase_order,
      primary_contact_name: primary_contact_name,
      primary_contact_email: primary_contact_email,
      phone_num: phone_num,
      alt_phone_num: alt_phone_num,
      fax_num: fax_num,
    },
  });

  // const formValues = billingForm.watch();

  // useEffect(() => {
  //   console.log("form values changed");
  //   console.log(formValues);
  //   setSaveButtonDisabled(false);
  // }, [formValues]);

  async function handleFormSave(data: z.infer<typeof BillingInfoSchema>) {
    //console.log("xxxx submit handler xxxx");

    isBlankForm ? 
      createBillingInfo(data)
      : updateBillingInfo(id, data);//NOTE BUG: potential bug here, need to test if we can get call updateBillingInfo with id = -1
    setIsEditEnabled(!isEditEnabled);
    toggleBillingForm && toggleBillingForm();
    //console.log(data);
    //insertBillingInfo();
  }

  return (
    <div>
      <Form {...billingForm}>
        <form
          onSubmit={billingForm.handleSubmit(handleFormSave)}
          className="space-y-6"
        >
          {/* ------------------- payment method section ------------------- */}

          <div className="flex space-x-8">
            <div className="w-full">
              <FormField
                control={billingForm.control}
                name="payment_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={!isEditEnabled}
                        className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {billingForm.formState.errors.payment_method?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={billingForm.control}
                name="purchase_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Order</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={!isEditEnabled}
                        className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {billingForm.formState.errors.purchase_order?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            {/** NOTE TODO: add 'make primary' input  */}
          </div>
          {/* ------------------- contact section ------------------- */}
          <div className="space-y-4">
            <div className="border-b-2">
              <h2 className="text-xl font-semibold">Primary Contact</h2>
            </div>
            {/* ------------------- name and email row ------------------- */}
            <div className="flex space-x-8">
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="primary_contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.primary_contact_name
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="primary_contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.primary_contact_email
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* ------------------- phone number row ------------------- */}
            <div className="flex space-x-8">
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="phone_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {billingForm.formState.errors.phone_num?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="alt_phone_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {billingForm.formState.errors.alt_phone_num?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="fax_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax Number</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {billingForm.formState.errors.fax_num?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          {/* ------------------- billing address section ------------------- */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b-2">
              Billing Address
            </h2>
            {/* ------------------- street address row ------------------- */}
            <div className="flex space-x-8">
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="billing_addr.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.billing_addr?.street
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="billing_addr.apt_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apt/Suite/Lot</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.billing_addr?.apt_num
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* ------------------- city, state, zip, country row ------------------- */}
            <div className="flex space-x-8">
              <div className="w-full">
                <FormField
                  control={billingForm.control}
                  name="billing_addr.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.billing_addr?.city
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="billing_addr.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.billing_addr?.state
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="billing_addr.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.billing_addr?.zip
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="billing_addr.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!isEditEnabled}
                          className={
                            !isEditEnabled ? "bg-slate-100" : "bg-white"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          billingForm.formState.errors.billing_addr?.country
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {isEditEnabled ? (
              <div className="space-x-4">
                <Button
                  type="reset"
                  variant={"ghost"}
                  onClick={() => {
                    ToggleEditEnabled();
                    toggleBillingForm && toggleBillingForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            ) : (
              <>
                <Button type="button" onClick={ToggleEditEnabled}>
                  <Pencil size={16} />
                  <span className="pl-2">Edit</span>
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BillingForm;
