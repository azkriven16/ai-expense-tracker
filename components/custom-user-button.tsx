"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Moon, Sun, User2 } from "lucide-react";
import { useTheme } from "@/components/ui/theme-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export const CustomUserButton = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };
  return (
    <>
      <ClerkLoading>
        <div className="rounded-full border p-2 animate-pulse">
          <User2 className="size-4" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action
              label={theme === "light" ? "Dark mode" : "Light mode"}
              labelIcon={
                theme === "light" ? (
                  <Sun className="size-3" />
                ) : (
                  <Moon className="size-3" />
                )
              }
              onClick={handleThemeToggle}
            />
          </UserButton.MenuItems>
        </UserButton>
      </ClerkLoaded>
    </>
  );
};
