"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-context";

export function ThemeToggle({ ...props }) {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <Button
      className={cn("cursor-pointer")}
      {...props}
      onClick={handleThemeToggle}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
