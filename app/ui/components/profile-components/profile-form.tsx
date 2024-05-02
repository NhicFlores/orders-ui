'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage    
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//NOTE TODO: email validation, phone number validation - regex might work
//nested object schema with z.record
const formSchema = z.object({
    name: z.string({
        invalid_type_error: 'Please enter your name'
    }),
    email: z.string().email({
        message: "This is not a valid emaill address."
    }),
    phone_num: z.string({
        invalid_type_error: 'please enter a valid phone number.'
    }),
    billing_info: z.object({
        billing_addr: z.string({
            invalid_type_error: 'Please enter a valid street address.'
        }),
        payment_method: z.string({
            invalid_type_error: 'select payment method'
        }),
    }),
    shipping_info: z.object({
        delivery_addr: z.string({
            invalid_type_error: 'Please enter a valid street address.'
        }),
    }),
});

export default function ProfileForm(){

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone_num: "",
            billing_info: {
                billing_addr: "",
                payment_method: "",
            },
            shipping_info: {
                delivery_addr: "",
            },
        },
    })
    //NOTE TODO: onSubmit event handler 
    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     console.log("user form");
    //     console.log(form);
    // }

    function clickHandler(){
        console.log("click handler");
        console.log(form.formState);
    }
    //create multiple forms - one for customer info, billing info, delivery info
    //pass that form data from each back to the action 
    //in action, build the object you're going to send back to the db 
    return (
        <Form {...form}>
            <form>
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="..." {...field}/>
                            </FormControl>
                            <FormDescription>
                                First Name
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@yourdomain.com" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Primary Email
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="phone_num"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="(000)000-0000" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Primary Phone Number
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="billing_info.billing_addr"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Billing Address</FormLabel>
                            <FormControl>
                                <Input placeholder="street address" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="billing_info.payment_method"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                                <Input placeholder="credit..." {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shipping_info.delivery_addr"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                                <Input placeholder="street address" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" onClick={clickHandler}>Save</Button>
            </form>
        </Form>
    )
}