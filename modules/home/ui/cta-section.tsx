import { Button } from "@/components/ui/button";
import { Bell, Brain, Shield, Zap } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent)]"></div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 2xl:max-w-[1400px]">
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h2 className="scroll-m-10 md:scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-6 leading-tight">
            Take Control of Your
            <span className="block text-primary">Financial Future</span>
          </h2>
        </div>

        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-muted-foreground text-xs md:text-xl mb-12">
            Join thousands of users who've transformed their financial habits
            with AI-powered expense tracking. Start your journey to financial
            freedom today.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm md:text-base">Bank-Level Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm md:text-base">Real-Time Sync</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span className="text-sm md:text-base">Smart Alerts</span>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          <Button
            size={"lg"}
            asChild
            className="w-full sm:w-auto min-w-[200px] h-12 text-base font-semibold px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Link href="/sign-up">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
