import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Users, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-glow/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-glow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Decentralized Dataset
            </span>
            <br />
            <span className="text-foreground">
              Governance & Rewards
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            The world's first DAO-governed dataset marketplace. Contribute datasets, 
            validate quality, and earn <span className="text-primary font-semibold">$DAIV</span> tokens 
            while building the future of open data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/upload">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Upload Dataset
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 border-primary/50 hover:bg-primary/10">
                Browse Datasets
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50 backdrop-blur-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Datasets Available</div>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50 backdrop-blur-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-success/20 rounded-lg mx-auto mb-4">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">892</div>
              <div className="text-sm text-muted-foreground">Active Contributors</div>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50 backdrop-blur-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-warning/20 rounded-lg mx-auto mb-4">
                <Coins className="w-6 h-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">45.8K</div>
              <div className="text-sm text-muted-foreground">$DAIV Distributed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;