import { Navbar } from "@/modules/home/ui/navbar";
import { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
