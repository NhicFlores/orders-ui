'use client'

import { RegisterSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import CardWrapper from "./CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RegisterForm = () => {

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
    }
  })

  function onSubmit(data: z.infer<typeof RegisterSchema>){
    console.log("in submit handler");
  }

  return (
    <CardWrapper 
      header="Register"
      label="Create an account"
      backButtonHref="/auth/login"
      backButtonLabel="Have an account? Log in."
      >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="name@yourdomain.com"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}  
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="first name last name"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}  
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="***"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}  
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="***"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}  
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
