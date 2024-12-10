"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loggedInUser } from "@/lib/utilities/getUser";
import ProfileAPI from "@/lib/api/profile";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// Define Zod schema with default values and validation
const updateProfileSchema = z.object({
  bio: z.string().optional().default(""),
  avatarUrl: z.string().url("Must be a valid URL").default(""),
  avatarAlt: z.string().default("Avatar Alt"),
  bannerUrl: z.string().url("Must be a valid URL").default(""),
  avatarAlt: z.string().default("Banner Alt"),
});

const UpdateProfile = ({ data, onProfileUpdate }) => {
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      bio: data?.bio || "",
      avatarUrl: data?.avatar?.url || "",
      avatarAlt: data?.avatar?.alt || "",
      bannerUrl: data?.banner?.url || "",
      bannerAlt: data?.banner?.alt || "",
    },
  });

  const onSubmit = async (values) => {
    const updateData = {
      bio: values.bio,
      avatar: {
        url: values.avatarUrl,
        alt: values.avatarAlt,
      },
      banner: {
        url: values.bannerUrl,
        alt: values.bannerAlt,
      },
    };

    try {
      await new ProfileAPI().profile.update(loggedInUser.name, updateData);
      onProfileUpdate(updateData);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Update failed", {
        description: "An error occurred. Please try again.",
      });
    } finally {
      toast.success("Success", {
        description: "Your profile has been updated",
        position: "top-center",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          disabled
          name="username"
          value={`@${loggedInUser?.name}`}
          readOnly
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Enter your bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter avatar URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarAlt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar ALT</FormLabel>
              <FormControl>
                <Input placeholder="Enter avatar alt text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter avatar URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bannerAlt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner ALT</FormLabel>
              <FormControl>
                <Input placeholder="Enter avatar alt text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProfile;
