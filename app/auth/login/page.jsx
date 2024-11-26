"use client";

import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api/auth/login";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons for show/hide password

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsError(false); // Reset error state before attempting login

      const response = await login(formData); // Call the login function
      console.log("Login successful:", response);

      location.href = "/"; // Redirect on success
    } catch (error) {
      console.error("Login failed:", error);
      setIsError(true); // Show an error message to the user
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <section className="sm:p-0 px-2 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="max-w-[25rem]  w-full p-5 grid gap-4">
        <CardTitle>Login</CardTitle>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <Label htmlFor="email">Your email address</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <Label htmlFor="password">Your password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength={8}
            />
            {/* Toggle button for password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {isLoading ? (
            <LoadingButton message="Logging in..." />
          ) : (
            <Button type="submit">Login</Button>
          )}
          {isError && (
            <span className="text-destructive">
              Incorrect email or password
            </span>
          )}
          <span className="text-muted-foreground">
            Don't have an account?{" "}
            <Link className="text-primary" href="/auth/register">
              Sign up
            </Link>{" "}
          </span>
        </form>
      </Card>
    </section>
  );
};

export default LoginForm;
