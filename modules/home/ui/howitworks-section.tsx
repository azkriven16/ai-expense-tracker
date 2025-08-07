import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Connect Your Accounts",
      description:
        "Securely link your bank accounts and credit cards for automatic transaction syncing.",
      variant: "default",
    },
    {
      step: "02",
      title: "AI Categorizes Everything",
      description:
        "Our AI automatically categorizes transactions and learns your spending patterns.",
      variant: "secondary",
    },
    {
      step: "03",
      title: "Get Smart Insights",
      description:
        "Receive personalized insights, alerts, and recommendations based on your data.",
      variant: "outline",
    },
    {
      step: "04",
      title: "Achieve Your Goals",
      description:
        "Stay on track with budgets and savings goals powered by AI-driven guidance.",
      variant: "destructive",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 text-xs md:text-sm">
            How It Works
          </Badge>
          <h2 className="scroll-m-10 md:scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Get Started in <span className="text-primary">4 Simple Steps</span>
          </h2>
        </div>

        <div className="mx-auto mt-5 max-w-3xl text-center mb-16">
          <p className="text-muted-foreground text-xs md:text-xl">
            Follow our simple process to transform how you manage your finances
            with AI-powered insights.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card className="hover:shadow-lg transition-all duration-300 h-full border-border">
                <CardHeader className="text-center">
                  <Badge className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-xl font-black group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </Badge>
                  <CardTitle className="text-foreground text-xl font-bold">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center text-sm md:text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-0.5 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
