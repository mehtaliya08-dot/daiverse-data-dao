import { useState } from "react";
import { Search, Filter, Download, Star, Calendar, FileText, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock dataset data
const datasets = [
  {
    id: 1,
    title: "Climate Change Temperature Data",
    description: "Global temperature measurements from 1880-2023 collected from weather stations worldwide.",
    tags: ["climate", "temperature", "environment"],
    license: "CC BY 4.0",
    size: "2.3 GB",
    downloads: 1247,
    rating: 4.8,
    uploadDate: "2024-01-15",
    contributor: "ClimateResearch.eth",
    rewardTokens: 150,
    status: "approved"
  },
  {
    id: 2,
    title: "Medical Image Classification Dataset",
    description: "Chest X-ray images for pneumonia detection with expert annotations from radiologists.",
    tags: ["medical", "x-ray", "classification", "healthcare"],
    license: "CC BY-NC 4.0",
    size: "15.7 GB",
    downloads: 892,
    rating: 4.9,
    uploadDate: "2024-01-10",
    contributor: "MedAI.eth",
    rewardTokens: 300,
    status: "approved"
  },
  {
    id: 3,
    title: "Financial Markets Sentiment Analysis",
    description: "Social media posts and news articles with sentiment labels for cryptocurrency markets.",
    tags: ["finance", "sentiment", "cryptocurrency", "nlp"],
    license: "MIT",
    size: "890 MB",
    downloads: 634,
    rating: 4.6,
    uploadDate: "2024-01-08",
    contributor: "CryptoAnalytics.eth",
    rewardTokens: 100,
    status: "approved"
  },
  {
    id: 4,
    title: "Urban Traffic Flow Patterns",
    description: "Real-time traffic data from smart city sensors across multiple metropolitan areas.",
    tags: ["traffic", "urban", "sensors", "transportation"],
    license: "Open Data",
    size: "5.2 GB",
    downloads: 456,
    rating: 4.7,
    uploadDate: "2024-01-05",
    contributor: "SmartCity.eth",
    rewardTokens: 200,
    status: "approved"
  }
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("downloads");

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && dataset.tags.includes(selectedCategory);
  });

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Browse <span className="bg-gradient-primary bg-clip-text text-transparent">Datasets</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover and download high-quality datasets validated by our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="climate">Climate</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rewards">Highest Rewards</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Dataset Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="bg-gradient-card border-border/50 hover:shadow-elevation transition-all duration-300 group">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {dataset.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    Approved
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {dataset.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {dataset.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span>{dataset.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-warning" />
                    <span>{dataset.rating}/5.0</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{dataset.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(dataset.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* License and Contributor */}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>License: {dataset.license}</span>
                  <span>By: {dataset.contributor}</span>
                </div>

                {/* Reward Tokens */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">D</span>
                    </div>
                    <span className="text-sm font-medium">{dataset.rewardTokens} $DAIV earned</span>
                  </div>
                  <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="hover:bg-primary/10">
            Load More Datasets
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;