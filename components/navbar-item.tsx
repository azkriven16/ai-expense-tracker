"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}
export const NavbarItem = ({ title, url }: MenuItem) => {
  const pathname = usePathname();
  return (
    <NavigationMenuItem key={title}>
      <NavigationMenuLink
        href={url}
        className={cn(
          "text-xs bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors",
          url === pathname && "bg-secondary"
        )}
      >
        {title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
