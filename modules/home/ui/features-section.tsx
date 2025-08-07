import { Card, CardContent } from "@/components/ui/card";
import {
  RocketIcon,
  ShieldCheckIcon,
  ZapIcon,
  BarChartIcon,
} from "lucide-react";

const features = [
  {
    icon: RocketIcon,
    title: "Fast Performance",
    description:
      "Optimized for speed and efficiency, ensuring your application runs smoothly.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure by Default",
    description: "Built-in security features to protect your data and users.",
  },
  {
    icon: ZapIcon,
    title: "Easy Integration",
    description: "Simple to integrate with your existing tools and workflows.",
  },
  {
    icon: BarChartIcon,
    title: "Analytics",
    description: "Detailed insights and metrics to track your progress.",
  },
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto mt-5 max-w-2xl text-center">
        <h2 className="scroll-m-10 md:scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Features that make you productive
        </h2>
      </div>

      <div className="mx-auto mt-5 max-w-3xl text-center">
        <p className="text-muted-foreground text-xs md:text-xl">
          Everything you need to get your work done efficiently and effectively.
          Built for developers, designed for success.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="p-0">
            <CardContent className="space-y-2 p-6">
              <feature.icon className="text-primary h-12 w-12" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
