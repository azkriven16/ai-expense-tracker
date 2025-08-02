'use client'

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { poppins } from "@/modules/fonts";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {
  const isMobile = useIsMobile()
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
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-2">
          <NavItem href={"/dashboard"} text="Dashboard" />
          <NavItem href={"/about"} text="About" />
          <NavItem href={"/contact"} text="Contact" />
        </ul>
      </nav>
      <div className="flex gap-2 flex-1 justify-end">
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
    </header>
  );
};

interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  return (
    <li className="p-2 hover:bg-primary hover:text-primary-foreground">
      <Link href={href} className="font-semibold text-sm">
        {text}
      </Link>
    </li>
  );
}

function MobileNav(){

}