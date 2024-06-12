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
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import {
  createBillingInfo,
  insertBillingInfo,
} from "@/lib/actions/profile-actions";
import { BillingInfo } from "@/lib/definitions/profile-definitions";

interface BillingFormProps {
  user_id: string;
  billing_info?: BillingInfo;
  mode?: "edit" | "view";
}

const BillingForm = ({ user_id, billing_info }: BillingFormProps) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  async function ToggleEditEnabled() {
    setIsEditEnabled(!isEditEnabled);
  }

  const {
    billing_addr = {},
    payment_method = "",
    purchase_order = "",
    primary_contact_name = "",
    primary_contact_email = "",
    phone_num = "",
    alt_phone_num = "",
    fax_num = "",
  } = billing_info;

  const { street, apt_num, city, state, zip, country } = billing_addr;

  const billingForm = useForm<z.infer<typeof BillingInfoSchema>>({
    resolver: zodResolver(BillingInfoSchema),
    defaultValues: {
      billing_addr: {
        street: street || "",
        apt_num: apt_num || "",
        city: city || "",
        state: state || "",
        zip: zip || "",
        country: country || "",
      },
      payment_method: payment_method || "",
      purchase_order: purchase_order || "",
      primary_contact_name: primary_contact_name || "",
      primary_contact_email: primary_contact_email || "",
      phone_num: phone_num || "",
      alt_phone_num: alt_phone_num || "",
      fax_num: fax_num || "",
    },
  });

  async function handleFormSave(data: z.infer<typeof BillingInfoSchema>) {
    console.log("submit handler");
    createBillingInfo(user_id, data);
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
                  onClick={() => ToggleEditEnabled()}
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
