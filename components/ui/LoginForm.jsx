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

import { login } from "@/lib/api/auth/login";
import { loginSchema } from "@/app/schema";
import LoadingButton from "@/components/ui/LoadingButton";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    try {
      console.log(formData);
      setIsLoading(true);
      await login(formData);
      window.location.href = "/";
      toast.success("Success!", {
        description: "You've signed in",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to login. Please try again.");
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
                <PasswordInput placeholder="Password123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isLoading ? (
          <Button type="submit" className="w-full">
            Login
          </Button>
        ) : (
          <LoadingButton message="Login" />
        )}
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
