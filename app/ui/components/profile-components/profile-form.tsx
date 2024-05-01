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
//NOTE TODO: email validation, phone number validation 
//nested object schema with z.record
const formSchema = z.object({
    name: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
    email: z.string().email({
        message: "This is not a valid emaill address."
    }),
    phone_num: z.string().min(10, {
        message: "Enter a valid phone number."
    }),
    billing_info: z.object({
        billing_addr: z.string().min(5, {
            message: "invalid characters in address"
        }),
    })
})

export default function ProfileForm(){

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    //NOTE TODO: onSubmit event handler 
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("user form");
        console.log(form);
    }

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
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}