import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Announcement Banner */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
            href="#"
          >
            New! AI-powered features
            <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
              <svg
                className="h-4 w-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>
        {/* End Announcement Banner */}
        {/* Title */}
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Meet Lootsy: Your AI-Powered Expense Tracker
          </h1>
        </div>
        {/* End Title */}
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-muted-foreground text-xl">
            Take control of your finances with Lootsy. Effortlessly track
            spending, get smart insights, and let AI help you save
            more—automatically.
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <Button size={"lg"} asChild>
            <Link href="/sign-up">Start Tracking Free</Link>
          </Button>
          <Button size={"lg"} variant={"outline"} asChild>
            <Link href="/sign-up">See How It Works</Link>
          </Button>
        </div>
        {/* End Buttons */}
        <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
          <span className="text-muted-foreground text-sm">Learn more:</span>
          <span className="text-sm font-bold">AI Expense Guide</span>
          <svg
            className="text-muted-foreground h-5 w-5"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <a
            className="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline"
            href="#"
          >
            How Lootsy Works
            <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};
