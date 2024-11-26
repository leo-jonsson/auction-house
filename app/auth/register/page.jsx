"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { register } from "@/lib/api/auth/register";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData); // Call the register function directly
      console.log("Registration successful:", response);
      alert(`Welcome, ${response.data.name}! Your account has been created.`);
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed, please try again.");
    }
  };

  return (
    <section className="sm:p-0 px-2 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="max-w-[25rem] w-full p-5 grid gap-4">
        <CardTitle>Register an account</CardTitle>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <Label htmlFor="name">Username</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Pick a username"
            pattern="^[\w]+$"
            maxLength={20}
            required
            title="Name should contain only letters and numbers, no spaces or special characters."
          />
          <Label htmlFor="email">Your email address</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
            required
            title="Email should be a valid Noroff mail"
          />
          <Label htmlFor="password">Your password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            minLength={8}
            title="Password must be at least 8 characters long."
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <Button type="submit">Register</Button>
          <span className="text-muted-foreground">
            Already have an account?{" "}
            <Link className="text-primary" href="/auth/login">
              Login
            </Link>{" "}
          </span>
        </form>
      </Card>
    </section>
  );
};

export default RegisterForm;
