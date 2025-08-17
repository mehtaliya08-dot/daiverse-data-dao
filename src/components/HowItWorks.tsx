import { Upload, Users, CheckCircle, Coins } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "1. Upload Dataset",
    description: "Connect your wallet and submit your dataset with proper metadata, tags, and licensing information."
  },
  {
    icon: Users,
    title: "2. Community Review",
    description: "DAO members validate your dataset for quality, compliance, and authenticity through democratic voting."
  },
  {
    icon: CheckCircle,
    title: "3. Get Approved",
    description: "Once approved, your dataset is added to the on-chain registry and becomes publicly accessible."
  },
  {
    icon: Coins,
    title: "4. Earn Rewards",
    description: "Receive $DAIV tokens as base rewards, plus additional retroactive rewards based on dataset usage."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">DAIverse</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From dataset submission to earning rewards, our streamlined process 
            ensures quality, transparency, and fair compensation for all contributors.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group">
                  {/* Step Icon */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-card rounded-2xl border border-border/50 backdrop-blur-sm">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground">Join the decentralized data revolution today.</p>
            </div>
            <button className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all duration-300 whitespace-nowrap">
              Start Contributing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;