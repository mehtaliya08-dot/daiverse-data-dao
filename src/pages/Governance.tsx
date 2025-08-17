import { useState } from "react";
import { Vote, Clock, CheckCircle, XCircle, Users, Coins, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock governance data
const activeProposals = [
  {
    id: 1,
    title: "Approve Climate Dataset #247",
    description: "Global temperature measurements from weather stations across 50 countries",
    proposer: "ClimateResearch.eth",
    type: "dataset_approval",
    votesFor: 1247,
    votesAgainst: 23,
    totalVotes: 1270,
    quorum: 1000,
    timeRemaining: "2 days",
    status: "active",
    endDate: "2024-01-20",
    datasetInfo: {
      size: "2.3 GB",
      format: "CSV",
      tags: ["climate", "temperature", "environment"]
    }
  },
  {
    id: 2,
    title: "Increase Base Reward to 75 $DAIV",
    description: "Proposal to increase the base reward for approved datasets from 50 to 75 $DAIV tokens",
    proposer: "DAOGovernance.eth",
    type: "parameter_change",
    votesFor: 892,
    votesAgainst: 156,
    totalVotes: 1048,
    quorum: 1000,
    timeRemaining: "5 days",
    status: "active",
    endDate: "2024-01-23"
  }
];

const completedProposals = [
  {
    id: 3,
    title: "Approve Medical Dataset #189",
    description: "Chest X-ray images for pneumonia detection with expert annotations",
    proposer: "MedAI.eth",
    type: "dataset_approval",
    votesFor: 1456,
    votesAgainst: 12,
    totalVotes: 1468,
    status: "approved",
    endDate: "2024-01-15",
    result: "approved"
  },
  {
    id: 4,
    title: "Implement Anti-Spam Measures",
    description: "Require 10 $DAIV stake for dataset submissions to prevent spam",
    proposer: "SecurityDAO.eth",
    type: "policy_change",
    votesFor: 1234,
    votesAgainst: 234,
    totalVotes: 1468,
    status: "approved",
    endDate: "2024-01-12",
    result: "approved"
  }
];

const Governance = () => {
  const [selectedTab, setSelectedTab] = useState("active");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-warning/20 text-warning border-warning/30";
      case "approved": return "bg-success/20 text-success border-success/30";
      case "rejected": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dataset_approval": return CheckCircle;
      case "parameter_change": return Coins;
      case "policy_change": return Users;
      default: return Vote;
    }
  };

  const ProposalCard = ({ proposal, isActive = false }: { proposal: any, isActive?: boolean }) => {
    const TypeIcon = getTypeIcon(proposal.type);
    const votePercentage = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0;
    const quorumMet = proposal.totalVotes >= (proposal.quorum || 0);

    return (
      <Card className="bg-gradient-card border-border/50 hover:shadow-elevation transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg">{proposal.title}</CardTitle>
            <Badge className={getStatusColor(proposal.status)}>
              {proposal.status === "active" ? "Voting" : proposal.result || proposal.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{proposal.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Proposal Type and Proposer */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <TypeIcon className="w-4 h-4 text-primary" />
              <span className="capitalize">{proposal.type.replace('_', ' ')}</span>
            </div>
            <span className="text-muted-foreground">By: {proposal.proposer}</span>
          </div>

          {/* Dataset Info (if applicable) */}
          {proposal.datasetInfo && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {proposal.datasetInfo.size}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {proposal.datasetInfo.format}
              </Badge>
              {proposal.datasetInfo.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Voting Results */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Support: {votePercentage.toFixed(1)}%</span>
              <span>{proposal.totalVotes.toLocaleString()} votes</span>
            </div>
            
            <Progress value={votePercentage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{proposal.votesFor.toLocaleString()} For</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span>{proposal.votesAgainst.toLocaleString()} Against</span>
              </div>
            </div>

            {proposal.quorum && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Quorum: {proposal.quorum.toLocaleString()}</span>
                <span className={quorumMet ? "text-success" : "text-warning"}>
                  {quorumMet ? "Met" : "Not Met"}
                </span>
              </div>
            )}
          </div>

          {/* Time and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {isActive ? `${proposal.timeRemaining} left` : `Ended ${proposal.endDate}`}
              </span>
            </div>
            
            {isActive && (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-destructive/50 hover:bg-destructive/10">
                  <XCircle className="w-4 h-4 mr-1" />
                  Against
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Vote For
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            DAO <span className="bg-gradient-primary bg-clip-text text-transparent">Governance</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Participate in decentralized governance and shape the future of DAIverse
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Vote className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground">Active Proposals</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">DAO Members</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">72.3%</div>
              <div className="text-sm text-muted-foreground">Avg Participation</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary-glow/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Coins className="w-6 h-6 text-primary-glow" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">500</div>
              <div className="text-sm text-muted-foreground">Your Voting Power</div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Active Proposals ({activeProposals.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Completed ({completedProposals.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} isActive={true} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} isActive={false} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Create Proposal CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-card border-border/50 p-8 max-w-md mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Vote className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Create a Proposal</h3>
              <p className="text-muted-foreground text-sm">
                Have an idea to improve DAIverse? Submit a proposal for community voting.
              </p>
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Create Proposal
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Governance;