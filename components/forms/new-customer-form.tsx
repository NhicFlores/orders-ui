"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { NewCustomerFormSchema } from '@/schema/form-schema';
import { useForm } from 'react-hook-form';

const NewCustomerForm = () => {
    const form = useForm<z.infer<typeof NewCustomerFormSchema>>({
        resolver: zodResolver(NewCustomerFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            type: "",
            account_num: "",
            credit_status: "",
            credit_limit: 0,
        },
    })

    const onSubmit = (data: z.infer<typeof NewCustomerFormSchema>) => {
        console.log("NOT IMPLEMENTED YET")
        console.log("DATA:", data)
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                            <Input placeholder='Customer Name' {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </form>
    </Form>
  )
}

export default NewCustomerForm
