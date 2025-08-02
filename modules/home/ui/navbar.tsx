"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { poppins } from "@/modules/fonts";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  return (
    <header
      className={cn(
        poppins.className,
        "flex justify-between items-center p-4 gap-4 h-16"
      )}
    >
      <Link href="/" className="flex-1 text-lg font-bold">
        Lootsy
      </Link>

      {/* Desktop Navigation - Hidden on mobile */}
      <DesktopNav />

      {/* Mobile Navigation - Hidden on desktop */}
      <MobileNav />
    </header>
  );
};

function DesktopNav() {
  return (
    <>
      <nav className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-2">
          <NavItem href={"/dashboard"} text="Dashboard" />
          <NavItem href={"/about"} text="About" />
          <NavItem href={"/contact"} text="Contact" />
        </ul>
      </nav>
      <div className="hidden md:flex gap-2 flex-1 justify-end">
        <ThemeToggle />
        <SignedOut>
          <SignInButton>
            <Button variant="ghost" className="font-semibold text-base">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="font-semibold text-base">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden items-center gap-2">
      <ThemeToggle />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[65vh]">
          <VisuallyHidden>
            <DrawerTitle>Navigation Menu</DrawerTitle>
          </VisuallyHidden>
          <div className="flex flex-col gap-6 p-6">
            {/* Navigation Links */}
            <nav className="flex-1">
              <ul className="flex flex-col gap-2">
                <MobileNavItem
                  href="/dashboard"
                  text="Dashboard"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/about"
                  text="About"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/contact"
                  text="Contact"
                  onClick={() => setOpen(false)}
                />
              </ul>
            </nav>

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t mt-auto">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-semibold text-base"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-semibold text-base"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3 p-2">
                  <UserButton />
                  <span className="font-semibold">Account</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  return (
    <li className="p-2 hover:bg-primary hover:text-primary-foreground rounded-md">
      <Link href={href} className="font-semibold text-sm">
        {text}
      </Link>
    </li>
  );
}

interface MobileNavItemProps {
  href: string;
  text: string;
  onClick: () => void;
}

function MobileNavItem({ href, text, onClick }: MobileNavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-3 text-base font-semibold hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  );
}
