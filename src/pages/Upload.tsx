import { useState } from "react";
import { Upload as UploadIcon, FileText, Tag, Shield, Coins, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    license: "",
    category: ""
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateReward = () => {
    // Simple reward calculation based on file size and metadata completeness
    const baseReward = 50;
    const sizeBonus = uploadedFile ? Math.min(Math.floor(uploadedFile.size / (1024 * 1024)), 100) : 0;
    const metadataBonus = Object.values(formData).filter(val => val.trim() !== "").length * 10;
    return baseReward + sizeBonus + metadataBonus;
  };

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Upload <span className="bg-gradient-primary bg-clip-text text-transparent">Dataset</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Contribute to the decentralized data ecosystem and earn $DAIV tokens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UploadIcon className="w-5 h-5" />
                  <span>Dataset File</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-success/20 rounded-lg flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setUploadedFile(null)}
                        className="mt-4"
                      >
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                        <UploadIcon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-foreground">
                          Drag and drop your dataset here
                        </p>
                        <p className="text-muted-foreground">
                          or click to browse files
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileSelect}
                        accept=".csv,.json,.zip,.tar,.gz,.parquet"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Supported formats: CSV, JSON, ZIP, TAR, GZ, Parquet (Max: 5GB)
                </p>
              </CardContent>
            </Card>

            {/* Dataset Information */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Dataset Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter dataset title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your dataset, its contents, and potential use cases"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="climate">Climate & Environment</SelectItem>
                      <SelectItem value="medical">Medical & Healthcare</SelectItem>
                      <SelectItem value="finance">Finance & Economics</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="social">Social Sciences</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas (e.g., climate, temperature, weather)"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="license">License *</Label>
                  <Select value={formData.license} onValueChange={(value) => handleInputChange("license", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cc-by-4.0">CC BY 4.0</SelectItem>
                      <SelectItem value="cc-by-sa-4.0">CC BY-SA 4.0</SelectItem>
                      <SelectItem value="cc-by-nc-4.0">CC BY-NC 4.0</SelectItem>
                      <SelectItem value="mit">MIT License</SelectItem>
                      <SelectItem value="apache-2.0">Apache 2.0</SelectItem>
                      <SelectItem value="public-domain">Public Domain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estimated Reward */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Estimated Reward</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">
                    {calculateReward()} $DAIV
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Base reward:</span>
                      <span>50 $DAIV</span>
                    </div>
                    {uploadedFile && (
                      <div className="flex justify-between">
                        <span>Size bonus:</span>
                        <span>{Math.min(Math.floor(uploadedFile.size / (1024 * 1024)), 100)} $DAIV</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Metadata bonus:</span>
                      <span>{Object.values(formData).filter(val => val.trim() !== "").length * 10} $DAIV</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    + Retroactive rewards based on usage
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upload Process */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Upload Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <span className="text-sm">File validation & IPFS upload</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm">Metadata verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <span className="text-sm">DAO review & voting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">4</span>
                    </div>
                    <span className="text-sm">Token distribution</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> A small stake (10 $DAIV) will be required to prevent spam. 
                This will be returned upon approval or refunded if rejected for valid reasons.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Button 
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
              disabled={!uploadedFile || !formData.title || !formData.description || !formData.license || !formData.category}
            >
              <UploadIcon className="w-5 h-5 mr-2" />
              Submit Dataset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;