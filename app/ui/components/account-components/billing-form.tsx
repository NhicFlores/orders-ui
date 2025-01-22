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
import { BillingRoute, CheckoutRoute } from "@/routes";
import { useProductContext } from "@/components/product-components/product-context-provider";
import { CustomerBillingInformation } from "@/lib/data-model/schema-definitions";

interface BillingFormProps {
  billing_info?: CustomerBillingInformation;
  isBlankForm?: boolean;
  toggleBillingForm?: () => void;
  handlePaymentOptionChange?: (billing_id: string) => void;
}

const BillingForm = ({
  billing_info,
  isBlankForm,
  toggleBillingForm,
  handlePaymentOptionChange,
}: BillingFormProps) => {
  const [isEditEnabled, setIsEditEnabled] = useState(isBlankForm);

  function ToggleEditEnabled() {
    setIsEditEnabled(!isEditEnabled);
  }

  const billingForm = useForm<z.infer<typeof BillingInfoSchema>>({
    resolver: zodResolver(BillingInfoSchema),
    defaultValues: billing_info
      ? {
          ...billing_info,
          apt_num: billing_info.apt_num ?? "",
        }
      : {
          street: "",
          apt_num: "",
          city: "",
          state: "",
          zip: "",
          payment_method: "",
          purchase_order: "",
          primary_contact_name: "",
          primary_contact_email: "",
          primary_contact_phone: "",
          fax_num: "",
        },
  });

  // const formValues = billingForm.watch();

  // useEffect(() => {
  //   console.log("form values changed");
  //   console.log(formValues);
  //   setSaveButtonDisabled(false);
  // }, [formValues]);

  async function handleFormSave(data: z.infer<typeof BillingInfoSchema>) {
    // const pathToRevalidate = handlePaymentOptionChange
    //   ? CheckoutRoute.href
    //   : BillingRoute.href;
    // let billing_info_id: string | {};
    // billing_info
    //   ? updateBillingInfo(billing_info.id!, data)
    //   : billing_info_id = await createBillingInfo(data, pathToRevalidate);
    // handlePaymentOptionChange && billing_info_id && handlePaymentOptionChange(billing_info_id as string);

    // BUG NOTE: potential bug here, need to test if we can get call updateBillingInfo with id = -1
    isBlankForm
      ? createBillingInfo(data, BillingRoute.href)
      : billing_info?.billing_info_id &&
        updateBillingInfo(billing_info?.billing_info_id, data);
    //TODO NOTE: add error handling
    setIsEditEnabled(!isEditEnabled);
  }

  // const { setOrder } = useProductContext();
  // async function handleFormSubmit(data: z.infer<typeof BillingInfoSchema>) {
  //   try {
  //     if (!!billing_info) {
  //       console.log("updating billing info with id: ", billing_info.id);
  //       await updateBillingInfo(billing_info.id!, data);
  //     } else if (handlePaymentOptionChange) {
  //       console.log("creating billing info for checkout");
  //       const db_result = await createBillingInfo(data, CheckoutRoute.href);
  //       console.log("query result: ", db_result);
  //       //handlePaymentOptionChange(billing_info_id as string);
  //       const billing_data = { ...data, id: billing_info_id as number };
  //       billing_info_id && setOrder((prevOrder) => ({
  //         ...prevOrder,
  //         billing_info_id: billing_data as BillingInfo,
  //       }));
  //     } else {
  //       console.log("creating billing info for billing options");
  //       await createBillingInfo(data, BillingRoute.href);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
            {/** TODO NOTE: add 'make primary' input  */}
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
                  name="primary_contact_phone"
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
                        {
                          billingForm.formState.errors.primary_contact_phone
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
                  name="street"
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
                        {billingForm.formState.errors.street?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="apt_num"
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
                        {billingForm.formState.errors.apt_num?.message}
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
                  name="city"
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
                        {billingForm.formState.errors.city?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="state"
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
                        {billingForm.formState.errors.state?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={billingForm.control}
                  name="zip"
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
                        {billingForm.formState.errors.zip?.message}
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
                    isBlankForm && toggleBillingForm && toggleBillingForm();
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
