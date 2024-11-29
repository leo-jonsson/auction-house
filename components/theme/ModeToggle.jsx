"use client";

import * as React from "react";
import { Moon, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div>
        <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
          <Switch
            id="switch-12"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            className="peer absolute inset-0 h-[inherit] w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
          />
          <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
            <Sun
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="dark:rotate-[360deg] rotate-0 transition-all"
            />
          </span>
          <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
            <MoonStar
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="rotate-[270deg] dark:rotate-0 transition-all"
            />
          </span>
        </div>
        <Label htmlFor="switch-12" className="sr-only">
          Labeled switch
        </Label>
      </div>
    </>
  );
}
