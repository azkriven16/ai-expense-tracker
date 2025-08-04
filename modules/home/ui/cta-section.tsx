import { Button } from "@/components/ui/button";
import { Bell, Brain, Shield, Zap } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent)]"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-5xl font-black text-foreground mb-6 leading-tight">
            Take Control of Your
            <span className="block text-primary">Financial Future</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of users who've transformed their financial habits
            with AI-powered expense tracking. Start your journey to financial
            freedom today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              className="px-12 py-6 font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
          </div>

          <div className="mt-12 flex justify-center items-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Real-Time Sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Smart Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
