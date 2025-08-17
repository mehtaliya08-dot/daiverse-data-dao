import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FeatureSection />
      <HowItWorks />
    </div>
  );
};

export default Index;
