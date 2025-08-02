import { Button } from '@/components/ui/button';
import { Brain, DollarSign, TrendingDown, Users } from 'lucide-react';


export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-muted overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-border">
          <Brain className="w-4 h-4 text-primary mr-2" />
          <span className="text-foreground text-sm font-medium">AI-Powered Financial Intelligence</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent mb-6 leading-tight">
          LOOTSY
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Take control of your finances with AI-driven insights. Track expenses effortlessly, discover spending patterns, and achieve your financial goals with intelligent automation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200">
            Start Tracking Free
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl">
            Watch Demo
          </Button>
        </div>
        
        <div className="flex justify-center items-center space-x-8 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>500K+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>$2B+ Tracked</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            <span>30% Avg. Savings</span>
          </div>
        </div>
      </div>
    </section>
  );
};