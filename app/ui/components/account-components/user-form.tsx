"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { updateUser } from "@/lib/actions/profile-actions";
import { User } from "@/lib/data-model/schema-definitions";

interface UserFormProps {
  user: User;
}

export default function UserForm({ user }: UserFormProps) {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  //

  const userForm = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: user.email,
      password: isEditEnabled ? user.password : "********",
    },
  });

  async function handleUserSave(data: z.infer<typeof UserSchema>) {
    console.log("submit handler");

    if (data.email === user.email && data.password === user.password) {
      setIsEditEnabled(!isEditEnabled);
      return;
    }

    updateUser(user.user_id, data);
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsEditEnabled(!isEditEnabled);
  }

  function toggleEditMode() {
    setIsEditEnabled(!isEditEnabled);
  }

  return (
    <div>
      <Form {...userForm}>
        <form
          onSubmit={userForm.handleSubmit(handleUserSave)}
          className="space-y-6"
        >
          <div className="flex space-x-8">
            <div className="w-full">
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isEditEnabled}
                        className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      />
                    </FormControl>
                    <FormMessage>
                      {userForm.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        readOnly={!isEditEnabled}
                        className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      />
                    </FormControl>
                    <FormMessage>
                      {userForm.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            {isEditEnabled ? (
              <div>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    userForm.reset();
                    toggleEditMode();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            ) : (
              <Button type="button" onClick={toggleEditMode}>
                <Pencil size={16} />
                <span className="pl-2">Edit</span>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
