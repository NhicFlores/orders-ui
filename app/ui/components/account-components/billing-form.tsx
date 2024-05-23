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

const BillingForm = () => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  async function ToggleEditEnabled() {
    setIsEditEnabled(!isEditEnabled);
  }
  const billingForm = useForm<z.infer<typeof BillingInfoSchema>>({
    resolver: zodResolver(BillingInfoSchema),
    defaultValues: {
      billing_addr: {
        street: "",
        apt_num: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      payment_method: "",
      purchase_order: "", //this is an order specific number so we might move it from here
      primary_contact_name: "",
      primary_contact_email: "",
      phone_num: "",
      alt_phone_num: "",
      fax_num: "",
    },
  });
  return (
    <Form {...billingForm}>
      <form className="space-y-6">
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
          <h2 className="text-xl font-semibold border-b-2">Billing Address</h2>
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>
                      {billingForm.formState.errors.billing_addr?.city?.message}
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>
                      {billingForm.formState.errors.billing_addr?.zip?.message}
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
                      <Input {...field} />
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
              <Button variant={'ghost'}>Cancel</Button>
              <Button>Save</Button>
            </div>
          ) : (
            <>
              <Button onClick={ToggleEditEnabled}>
                <Pencil size={16} />
                <span className="pl-2">Edit</span>
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BillingForm;
