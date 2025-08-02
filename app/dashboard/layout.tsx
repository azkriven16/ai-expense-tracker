import { Navbar } from "@/modules/dashboard/ui/dashboard-navbar";
import { Footer } from "@/components/footer";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { userId } = await auth();

  if (!userId) redirect("/");

  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
