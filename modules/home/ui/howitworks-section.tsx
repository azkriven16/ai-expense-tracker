import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";




export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Connect Your Accounts",
      description: "Securely link your bank accounts and credit cards for automatic transaction syncing.",
      variant: "default"
    },
    {
      step: "02",
      title: "AI Categorizes Everything",
      description: "Our AI automatically categorizes transactions and learns your spending patterns.",
      variant: "secondary"
    },
    {
      step: "03",
      title: "Get Smart Insights",
      description: "Receive personalized insights, alerts, and recommendations based on your data.",
      variant: "outline"
    },
    {
      step: "04",
      title: "Achieve Your Goals",
      description: "Stay on track with budgets and savings goals powered by AI-driven guidance.",
      variant: "destructive"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get Started in <span className="text-primary">4 Simple Steps</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card className="hover:shadow-lg transition-all duration-300 h-full border-border">
                <CardHeader className="text-center">
                  <Badge 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-xl font-black group-hover:scale-110 transition-transform duration-300"
                  >
                    {step.step}
                  </Badge>
                  <CardTitle className="text-foreground text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
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