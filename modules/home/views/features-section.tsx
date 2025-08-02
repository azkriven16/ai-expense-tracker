import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Camera, PieChart, Target } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Insights",
      description: "Get personalized spending insights and recommendations powered by advanced machine learning algorithms.",
      color: "bg-primary/10"
    },
    {
      icon: <Camera className="w-8 h-8 text-secondary-foreground" />,
      title: "Smart Receipt Scanning",
      description: "Simply snap a photo of your receipt and let AI automatically categorize and record your expenses.",
      color: "bg-secondary/20"
    },
    {
      icon: <PieChart className="w-8 h-8 text-accent-foreground" />,
      title: "Intelligent Categorization",
      description: "Automatic expense categorization with AI that learns your spending habits over time.",
      color: "bg-accent/20"
    },
    {
      icon: <Target className="w-8 h-8 text-destructive" />,
      title: "Goal Tracking",
      description: "Set financial goals and get AI-powered recommendations to achieve them faster.",
      color: "bg-destructive/10"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Smart Features for <span className="text-primary">Smarter Spending</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Harness the power of artificial intelligence to transform how you manage and understand your money.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-border">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-foreground text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
