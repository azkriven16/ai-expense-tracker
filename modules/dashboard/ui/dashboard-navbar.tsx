import { AddNewExpenseButton } from "@/components/add-new-expense-button";
import { CustomUserButton } from "@/components/custom-user-button";
import { NavbarItem } from "@/components/navbar-item";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { poppins } from "@/modules/fonts";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { BarChart3, Brain, History, Home, Plus } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

export const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Lootsy",
  },
  menu = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home className="size-5" />,
    },
    {
      title: "Statistics",
      url: "/dashboard/statistics",
      icon: <BarChart3 className="size-5" />,
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: <History className="size-5" />,
    },
    {
      title: "AI Insights",
      url: "/dashboard/insights",
      icon: <Brain className="size-5" />,
    },
  ],
}: NavbarProps) => {
  return (
    <>
      {/* Desktop Navbar */}
      <section
        className={cn(
          poppins.className,
          "py-2 px-4 md:px-6 hidden lg:block sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b"
        )}
      >
        <div className="container">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href={logo.url} className="flex items-center gap-2">
                <img
                  src={logo.src}
                  className="max-h-8 dark:invert"
                  alt={logo.alt}
                />
                <span className="text-lg font-semibold tracking-tighter">
                  {logo.title}
                </span>
              </Link>

              {/* Navigation Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <AddNewExpenseButton />
                <CustomUserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      </section>

      {/* Mobile Top Bar */}
      <section
        className={cn(poppins.className, "py-4 px-4 block lg:hidden border-b")}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <img
              src={logo.src}
              className="max-h-7 dark:invert"
              alt={logo.alt}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>

          {/* Mobile Auth/User */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <CustomUserButton />
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      <SignedIn>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation menu={menu} />
        </div>
      </SignedIn>
    </>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ menu }: { menu: MenuItem[] }) => {
  const firstHalf = menu.slice(0, 2);
  const secondHalf = menu.slice(2);

  return (
    <nav className="bg-background border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {/* First half of menu items */}
        {firstHalf.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground min-w-0 flex-1"
          >
            <div className="text-muted-foreground">{item.icon}</div>
            <span className="text-xs font-medium text-muted-foreground truncate">
              {item.title}
            </span>
          </Link>
        ))}

        {/* Add Button in Center */}
        <Button
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-full min-w-0 flex-1"
        >
          <Link
            href={"/dashboard/create"}
            className="flex items-center justify-center w-full h-full"
          >
            <Plus className="size-5" />
          </Link>
        </Button>

        {/* Second half of menu items */}
        {secondHalf.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground min-w-0 flex-1"
          >
            <div className="text-muted-foreground">{item.icon}</div>
            <span className="text-xs font-medium text-muted-foreground truncate">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return <NavbarItem key={item.title} {...item} />;
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};
