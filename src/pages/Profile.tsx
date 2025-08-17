import { useState } from "react";
import { User, Wallet, Upload, Download, Vote, Coins, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock user data
const userData = {
  address: "0x742d35cc6b5c4532f0e9d4a6f5a8b2e1c3d4e5f6",
  ensName: "researcher.eth",
  joinDate: "2023-08-15",
  totalEarned: 2450,
  votingPower: 500,
  reputation: 4.8,
  level: "Gold Contributor",
  contributions: 12,
  downloads: 5670,
  votes: 89
};

const userDatasets = [
  {
    id: 1,
    title: "Climate Change Temperature Data",
    status: "approved",
    uploadDate: "2024-01-15",
    downloads: 1247,
    earnings: 350,
    size: "2.3 GB"
  },
  {
    id: 2,
    title: "Urban Traffic Patterns Dataset",
    status: "approved",
    uploadDate: "2024-01-08",
    downloads: 892,
    earnings: 200,
    size: "1.8 GB"
  },
  {
    id: 3,
    title: "Social Media Sentiment Analysis",
    status: "pending",
    uploadDate: "2024-01-18",
    downloads: 0,
    earnings: 0,
    size: "450 MB"
  }
];

const recentActivity = [
  {
    type: "upload",
    title: "Uploaded Climate Dataset #247",
    date: "2024-01-15",
    reward: 150
  },
  {
    type: "vote",
    title: "Voted on Medical Dataset Proposal",
    date: "2024-01-14",
    reward: 5
  },
  {
    type: "earning",
    title: "Retroactive reward for Traffic Dataset",
    date: "2024-01-12",
    reward: 75
  },
  {
    type: "download",
    title: "Your dataset was downloaded 50 times",
    date: "2024-01-10",
    reward: 25
  }
];

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/20 text-success border-success/30";
      case "pending": return "bg-warning/20 text-warning border-warning/30";
      case "rejected": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload": return Upload;
      case "vote": return Vote;
      case "earning": return Coins;
      case "download": return Download;
      default: return Calendar;
    }
  };

  const getLevelProgress = (level: string) => {
    const levels = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    const currentIndex = levels.findIndex(l => level.includes(l));
    return ((currentIndex + 1) / levels.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Your <span className="bg-gradient-primary bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your contributions, earnings, and impact on the DAIverse ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info Card */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-2">{userData.ensName}</h2>
                <p className="text-sm text-muted-foreground mb-4 font-mono">
                  {userData.address.slice(0, 6)}...{userData.address.slice(-4)}
                </p>
                
                <Badge className="mb-4 bg-gradient-primary text-primary-foreground border-none">
                  {userData.level}
                </Badge>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Level Progress</span>
                    <span>{getLevelProgress(userData.level).toFixed(0)}%</span>
                  </div>
                  <Progress value={getLevelProgress(userData.level)} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-foreground">{userData.reputation}</div>
                      <div className="text-xs text-muted-foreground">Reputation</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground">{userData.votingPower}</div>
                      <div className="text-xs text-muted-foreground">Voting Power</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-warning" />
                    <span className="text-sm">Total Earned</span>
                  </div>
                  <span className="font-bold text-warning">{userData.totalEarned} $DAIV</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-primary" />
                    <span className="text-sm">Contributions</span>
                  </div>
                  <span className="font-bold">{userData.contributions}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-success" />
                    <span className="text-sm">Downloads</span>
                  </div>
                  <span className="font-bold">{userData.downloads.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Vote className="w-4 h-4 text-accent-foreground" />
                    <span className="text-sm">Votes Cast</span>
                  </div>
                  <span className="font-bold">{userData.votes}</span>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Connection */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    <span className="font-medium">Wallet</span>
                  </div>
                  <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                    Connected
                  </Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Disconnect Wallet
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="datasets">My Datasets</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Earnings Chart Placeholder */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Earnings chart would go here</p>
                        <p className="text-sm text-muted-foreground">Total: {userData.totalEarned} $DAIV</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
                        <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-success">Gold Contributor</p>
                          <p className="text-sm text-muted-foreground">Contributed 10+ high-quality datasets</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Vote className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">Active Voter</p>
                          <p className="text-sm text-muted-foreground">Participated in 50+ governance votes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="datasets" className="space-y-6">
                {userDatasets.map((dataset) => (
                  <Card key={dataset.id} className="bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-foreground">{dataset.title}</h3>
                        <Badge className={getStatusColor(dataset.status)}>
                          {dataset.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Upload Date</p>
                          <p className="font-medium">{new Date(dataset.uploadDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Downloads</p>
                          <p className="font-medium">{dataset.downloads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Earnings</p>
                          <p className="font-medium text-warning">{dataset.earnings} $DAIV</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Size</p>
                          <p className="font-medium">{dataset.size}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    return (
                      <Card key={index} className="bg-gradient-card border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <ActivityIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-warning">+{activity.reward} $DAIV</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;