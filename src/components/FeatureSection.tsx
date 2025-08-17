import { Shield, Vote, Coins, Database, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Decentralized Storage",
    description: "Datasets stored securely on IPFS/Filecoin with metadata tracked on-chain for transparency and immutability."
  },
  {
    icon: Vote,
    title: "DAO Governance",
    description: "Community-driven validation ensures dataset quality and compliance through democratic voting processes."
  },
  {
    icon: Coins,
    title: "Fair Rewards",
    description: "Earn $DAIV tokens for contributing quality datasets and participating in governance activities."
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Multi-layer validation including automated checks, community review, and anti-spam mechanisms."
  },
  {
    icon: Globe,
    title: "Open Access",
    description: "All approved datasets are publicly accessible, auditable, and searchable through our decentralized registry."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by the community, for the community. Every decision is made collectively through DAO governance."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">DAIverse</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of dataset management with our revolutionary 
            decentralized platform that puts power back in the hands of the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-card border border-border/50 backdrop-blur-sm hover:shadow-elevation transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 group-hover:shadow-glow transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;