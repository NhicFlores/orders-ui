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
import {
  ShippingInfo,
  ShippingInfoDB,
} from "@/lib/definitions/profile-definitions";
import { ShippingInfoSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ShippingFormProps {
  shippingInfo?: ShippingInfo | ShippingInfoDB;
  toggleShippingForm: () => void;
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
          is_job_site: false,
          delivery_addr: {
            street: "",
            apt_num: "",
            city: "",
            state: "",
            zip: "",
            country: "",
          },
          note: "",
        },
  });

  async function handleFormSave(data: z.infer<typeof ShippingInfoSchema>) {
    isBlankForm
      ? createShippingInfo(data)
      : updateShippingInfo((shippingInfo as ShippingInfoDB).id, data);
    setIsEditEnabled(!isEditEnabled);

    //NOTE TODO: this is unsafe because the user input is being passed directly to the state
    // and will get send to backend without validation or sanitization
    // NOTE TODO: implement zod validation for the data
    console.log(data);
    setOrder((prevOrder) => ({
      ...prevOrder,
      shipping_info: data as ShippingInfoDB,
    }));
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
              name="delivery_addr.street"
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
                    {
                      shippingForm.formState.errors.delivery_addr?.street
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="delivery_addr.apt_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="delivery_addr.apt_num">
                    Apt/Suite/Lot
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {
                      shippingForm.formState.errors.delivery_addr?.apt_num
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between space-x-8">
            <FormField
              control={shippingForm.control}
              name="delivery_addr.city"
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
                    {shippingForm.formState.errors.delivery_addr?.city?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="delivery_addr.state"
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
                    {
                      shippingForm.formState.errors.delivery_addr?.state
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="delivery_addr.zip"
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
                    {shippingForm.formState.errors.delivery_addr?.zip?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="delivery_addr.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEditEnabled}
                      className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {
                      shippingForm.formState.errors.delivery_addr?.country
                        ?.message
                    }
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
