import { cn } from "@/lib/utils";
import { CTASection } from "../ui/cta-section";
import { FeaturesSection } from "../ui/features-section";
import { HeroSection } from "../ui/hero-section";
import { HowItWorksSection } from "../ui/howitworks-section";
import { StatsSection } from "../ui/stats-section";
import { poppins } from "@/modules/fonts";

const Homeview = () => {
  return (
    <div className={cn(poppins.className, "min-h-screen")}>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default Homeview;
