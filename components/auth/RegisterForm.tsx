"use client";

import { RegisterSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { LoginRoute } from "@/routes";
import FormError from "../form-components/form-error";
import FormSuccess from "../form-components/form-success";
import { registerUser } from "@/lib/actions/auth-actions";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    console.log("---------- in submit handler --------------");
    setLoading(true);
    //call action
    //const formData = new FormData(data)
    registerUser(data).then((validatedFields) => {
      setErrorMessage(validatedFields?.error);
      setSuccessMessage(validatedFields?.success); //confirm messages are mapped correctly
    });
    //update message
    //add message prop to form error and success
  }

  return (
    <CardWrapper
      header="Register"
      label="Create an account"
      backButtonHref={LoginRoute.href}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@yourdomain.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="***" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="***" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading ..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
