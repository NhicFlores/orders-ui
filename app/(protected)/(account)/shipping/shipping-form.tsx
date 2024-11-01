"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  ShippingInfo,
  ShippingInfoWithoutIds,
  UserShippingInformation,
} from "@/lib/definitions/data-model";
import { ShippingInfoSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ShippingFormProps {
  shippingInfo?: ShippingInfo;
  toggleShippingForm?: () => void;
  isBlankForm?: boolean;
}

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
    defaultValues: shippingInfo
      ? shippingInfo
      : {
          street: "",
          apt_num: "",
          city: "",
          state: "",
          zip: "",
          is_job_site: false,
          note: "",
        },
  });

  async function handleFormSave(data: z.infer<typeof ShippingInfoSchema>) {
    if (isBlankForm) {
      await createShippingInfo(data);
    } else if ((shippingInfo as UserShippingInformation)?.id) {
      await updateShippingInfo((shippingInfo as UserShippingInformation)?.id, data);
    }
    setIsEditEnabled(!isEditEnabled);

    // console.log(data);
    setOrder((prevOrder) => ({
      ...prevOrder,
      shipping_data: data as ShippingInfoWithoutIds,
    }));
  }

  function isShippingInfoWithId(info: ShippingInfo | undefined): info is UserShippingInformation {
    return (info as UserShippingInformation).id !== undefined;
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
