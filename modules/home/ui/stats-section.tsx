import { BarChart3, Brain, TrendingDown, Users } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    { number: "500K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "$2.1B+", label: "Expenses Tracked", icon: <BarChart3 className="w-6 h-6" /> },
    { number: "30%", label: "Average Savings", icon: <TrendingDown className="w-6 h-6" /> },
    { number: "99.9%", label: "Accuracy Rate", icon: <Brain className="w-6 h-6" /> }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-primary-foreground mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-primary-foreground/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};