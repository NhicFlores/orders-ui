import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShippingInfoSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ShippingForm() {
  const shippingForm = useForm<z.infer<typeof ShippingInfoSchema>>({
    resolver: zodResolver(ShippingInfoSchema),
    defaultValues: {
        delivery_addr: {
            street: "",
            apt_num: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
        note: "",
    }
  });

  return (
    <div>
      <Form {...shippingForm}>
        <form>
          <div className="flex justify-between gap-8">
            <FormField
              control={shippingForm.control}
              name="delivery_addr.street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="street">Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage>
                      {shippingForm.formState.errors.note?.message}
                    </FormMessage>
                  </FormItem>
                )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
