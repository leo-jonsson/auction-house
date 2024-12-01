"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "@/components/ui/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="sm:p-0 px-2 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="max-w-[25rem] w-full p-5 grid gap-4">
        <CardTitle>Register an account</CardTitle>
        <RegisterForm />
      </Card>
    </section>
  );
};

export default RegisterPage;
