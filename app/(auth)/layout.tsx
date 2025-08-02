import { Logo } from "@/components/logo";
import { ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <div className="my-10">
        <Logo />
      </div>
      <ClerkLoading>
        <div className="flex gap-2 items-center">
          <Loader2 className="animate-spin size-4" /> Loading
        </div>
      </ClerkLoading>
      {children}
    </section>
  );
}
