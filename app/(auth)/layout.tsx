import { Logo } from "@/components/logo";
import { ClerkLoading } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { userId } = await auth();

  if (userId) redirect("/dashboard");

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
