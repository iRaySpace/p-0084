import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, MoreVertical, Grid, List } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const suggestedFolders = [
  { id: 1, name: "Work Projects", type: "folder" },
  { id: 2, name: "Personal Documents", type: "folder" },
  { id: 3, name: "Client Files", type: "folder" },
  { id: 4, name: "Resources", type: "folder" },
];

const suggestedFiles = [
  { 
    id: 1, 
    name: "Project Proposal.xlsx", 
    type: "spreadsheet",
    lastEdited: "You edited • Jan 6, 2024",
    preview: "/lovable-uploads/350e6de7-809f-48a9-865d-2b12be1768a1.png"
  },
  { 
    id: 2, 
    name: "Meeting Notes.docx", 
    type: "document",
    lastEdited: "You've opened frequently",
    preview: null
  },
  { 
    id: 3, 
    name: "Budget Report.xlsx", 
    type: "spreadsheet",
    lastEdited: "You opened • Dec 6, 2024",
    preview: null
  },
  { 
    id: 4, 
    name: "Presentation.pptx", 
    type: "presentation",
    lastEdited: "You modified • Oct 22, 2024",
    preview: null
  },
];

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} has been uploaded.`,
      });
      setSelectedFile(null);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Welcome to Drive</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-accent' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-accent' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
                {selectedFile && (
                  <div className="text-sm text-muted-foreground">
                    Selected file: {selectedFile.name}
                  </div>
                )}
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="w-full"
                >
                  Upload
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Suggested folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {suggestedFolders.map((folder) => (
              <div
                key={folder.id}
                className="p-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="font-medium">{folder.name}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Suggested files</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {suggestedFiles.map((file) => (
              <div
                key={file.id}
                className="rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{file.name}</span>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{file.lastEdited}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;