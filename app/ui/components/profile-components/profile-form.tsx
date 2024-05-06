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
import { ProfileSchema } from "@/schema/form-schema";
import { redirect } from "next/navigation";
import { Home } from "@/app/lib/routes";

export default function ProfileForm(){

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
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
    async function onSubmit(data: z.infer<typeof ProfileSchema>){
        console.log("submit handler");
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        //redirect(Home.href);
    }
    //create multiple forms - one for customer info, billing info, delivery info
    //pass that form data from each back to the action 
    //in action, build the object you're going to send back to the db 
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
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
                <Button type="submit">Save</Button>
                </div>
            </form>
        </Form>
    )
}