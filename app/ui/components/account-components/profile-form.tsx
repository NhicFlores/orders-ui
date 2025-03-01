"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileSchema } from "@/schema/form-schema";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { createProfile, updateProfile } from "@/lib/actions/profile-actions";
import { UserProfile } from "@/lib/data-model/schema-types";

interface ProfileFormProps {
  user_id: string;
  profile: UserProfile;
}

export default function ProfileForm({ user_id, profile }: ProfileFormProps) {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const profileForm = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: profile && profile.first_name ? profile.first_name : "",
      last_name: profile && profile.last_name ? profile.last_name : "",
      phone_num: profile && profile.phone_num ? profile.phone_num : "",
    },
  });

  async function toggleEditEnabled() {
    setIsEditEnabled(!isEditEnabled);
  }
  //TODO NOTE: onSubmit event handler
  async function handleFormSave(data: z.infer<typeof ProfileSchema>) {
    console.log("submit handler");
    // if (
    //   data.name === profile.name &&
    //   data.company === profile.company &&
    //   data.account_num === profile.account_num &&
    //   data.phone_num === profile.phone_num
    // ) {
    //   setIsEditEnabled(!isEditEnabled);
    //   return;
    // }
    updateProfile(user_id, data);
    //createProfile(user_id, data);
    setIsEditEnabled(!isEditEnabled);
  }
  // NOTE: can use multi-step forms for registration or profile routes - one for customer info, billing info, delivery info
  //pass that form data from each back to the action
  //in action, build the object you're going to send back to the db
  // can use onChange to enable save button
  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(handleFormSave)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="flex space-x-8">
            <div className="w-full">
              <FormField
                control={profileForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isEditEnabled}
                        className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      />
                    </FormControl>
                    <FormMessage>
                      {profileForm.formState.errors.first_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={profileForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isEditEnabled}
                        className={!isEditEnabled ? "bg-slate-100" : "bg-white"}
                      />
                    </FormControl>
                    <FormMessage>
                      {profileForm.formState.errors.last_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={profileForm.control}
                name="phone_num"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(000)000-0000"
                        {...field}
                        className={isEditEnabled ? "bg-white" : "bg-slate-100"}
                        readOnly={!isEditEnabled}
                      />
                    </FormControl>
                    <FormDescription>Primary Phone Number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            {isEditEnabled ? (
              <div>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={toggleEditEnabled}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            ) : (
              <Button onClick={toggleEditEnabled}>
                <Pencil size={16} />
                <span className="pl-2">Edit</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
