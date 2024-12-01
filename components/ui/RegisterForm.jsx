"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { register } from "@/lib/api/auth/register";
import { registerSchema } from "@/app/schema";
import LoadingButton from "@/components/ui/LoadingButton";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    try {
      console.log(formData);
      setIsLoading(true);
      // Remove confirmPassword from the actual data being to our API-call
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      toast.success("Success!", {
        description: "Your account has been created.",
        position: "top-center",
      });
      router.push("/auth/login");
    } catch (error) {
      setError(true);
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input
                  placeholder="user@stud.noroff.no"
                  type="email"
                  {...field}
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
                <PasswordInput
                  placeholder="Password123"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  {...field} // Ensure any other necessary props are passed
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Re-enter your password"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <span className="text-destructive">
            Email or username already in use
          </span>
        )}
        {!isLoading ? (
          <Button type="submit" className="w-full">
            Register
          </Button>
        ) : (
          <LoadingButton message="Register" />
        )}
      </form>
    </Form>
  );
}
