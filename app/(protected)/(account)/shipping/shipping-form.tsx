"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
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
import {
  createShippingInfo,
  updateShippingInfo,
} from "@/lib/actions/profile-actions";
import { getDefaultShippingValues } from "@/lib/data-model/default-constructors";
import {
  CustomerShippingInformation
} from "@/lib/data-model/schema-types";
import { ShippingData, ShippingFields } from "@/lib/data-model/utility-types";
import { ShippingInfoSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// TODO: add server action to props and use in handleFormSave
interface ShippingFormProps {
  shippingInfo?: ShippingData;
  toggleShippingForm?: () => void;
  isBlankForm?: boolean;
}
// NOTE REFACTOR: refactor this component to take server action as a prop
// so it can be used in order and customer pages
export default function ShippingForm({
  shippingInfo,
  toggleShippingForm,
  isBlankForm,
}: ShippingFormProps) {
  const [isEditEnabled, setIsEditEnabled] = useState(isBlankForm);
  const { setOrder } = useProductContext();

  function ToggleEditEnabled() {
    setIsEditEnabled(!isEditEnabled);
  }

  const shippingForm = useForm<z.infer<typeof ShippingInfoSchema>>({
    resolver: zodResolver(ShippingInfoSchema),
    defaultValues: shippingInfo ? shippingInfo : getDefaultShippingValues(),
  });

  async function handleFormSave(data: z.infer<typeof ShippingInfoSchema>) {
    // NOTE TODO: refactor to check on existing shipping info id instead of isBlankForm flag
    if (isBlankForm) {
      await createShippingInfo(data);
    } else if (isCustomerShippingInfo(shippingInfo)) {
      await updateShippingInfo(shippingInfo.shipping_info_id, data);
    }
    setIsEditEnabled(!isEditEnabled);

    // console.log(data);
    setOrder((prevOrder) => ({
      ...prevOrder,
      shipping_data: data as ShippingFields,
    }));
  }

  function isCustomerShippingInfo(
    info: ShippingData | undefined
  ): info is CustomerShippingInformation {
    return (info as CustomerShippingInformation).shipping_info_id !== undefined;
  }

  return (
    <div>
      <Form {...shippingForm}>
        <form
          onSubmit={shippingForm.handleSubmit(handleFormSave)}
          className="space-y-4"
        >
          <div className="flex justify-between gap-8">
            <FormField
              control={shippingForm.control}
              name="street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="street">Street</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {shippingForm.formState.errors.street?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="apt_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="apt_num">Apt/Suite/Lot</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage>
                    {shippingForm.formState.errors.apt_num?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between space-x-8">
            <FormField
              control={shippingForm.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="city">City</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {shippingForm.formState.errors.city?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="state">State</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {shippingForm.formState.errors.state?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="zip">Zip</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {shippingForm.formState.errors.zip?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={shippingForm.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="note">Note</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      type="text"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage>
                    {shippingForm.formState.errors.note?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end pt-2">
            {isEditEnabled ? (
              <div className="space-x-4">
                <Button
                  type="reset"
                  variant={"ghost"}
                  onClick={() => {
                    ToggleEditEnabled();
                    isBlankForm && toggleShippingForm && toggleShippingForm();
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
}
