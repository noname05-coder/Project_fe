
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [githubLink, setGithubLink] = useState('');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate file upload/analysis
    setIsUploading(true);
    
    // Mock progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // Move to next step after "analysis" is complete
        setTimeout(() => {
          navigate('/setup');
        }, 500);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
            <span className="font-display font-semibold text-xl">InterviewAI</span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-navy-600">1</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">2</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">3</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">4</span>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container max-w-3xl py-16">
        <h1 className="text-3xl font-display font-semibold mb-2 text-center">Upload Your Project</h1>
        <p className="text-slate-600 mb-8 text-center">
          Upload your project files or provide a GitHub link
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-navy-500 bg-navy-50" : "border-slate-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-4">
                <path d="M7 16.5v-7.5l-4.17 4.17a2.5 2.5 0 0 0 0 3.54 2.47 2.47 0 0 0 3.5 0l3.17-3.17c.73.74.73 1.95 0 2.69a1.85 1.85 0 0 1-2.61 0"></path>
                <path d="M12 12V2"></path><path d="m2 12 5-5"></path><path d="m7 7 5 5"></path><path d="M22 12h-8"></path>
                <path d="M20 16H12"></path><path d="M18 20h-6"></path>
              </svg>
              
              <p className="mb-4 font-medium">
                {file ? file.name : "Drag and drop your project file"}
              </p>
              
              <p className="text-sm text-slate-500 mb-4">
                Supported formats: PDF, ZIP, DOCX (max 100MB)
              </p>
              
              <div>
                <label htmlFor="file-upload" className="btn-outline px-4 py-2 cursor-pointer">
                  Select File
                </label>
                <input 
                  id="file-upload" 
                  type="file" 
                  onChange={handleFileChange} 
                  className="hidden"
                  accept=".pdf,.zip,.docx"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 py-2">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-sm text-slate-500 font-medium">OR</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              GitHub Repository Link
            </label>
            <input
              type="text"
              placeholder="https://github.com/yourusername/project"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Project Description (Optional)
            </label>
            <Textarea
              placeholder="Describe your project in 2–3 sentences..."
              className="min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Analyzing project...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-slate-500 text-center animate-pulse">
                {uploadProgress < 30 && "Uploading files..."}
                {uploadProgress >= 30 && uploadProgress < 60 && "Parsing content..."}
                {uploadProgress >= 60 && uploadProgress < 90 && "Analyzing code structure..."}
                {uploadProgress >= 90 && "Preparing interview questions..."}
              </p>
            </div>
          ) : (
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Back
              </Button>
              <Button 
                type="submit"
                className="btn-primary"
                disabled={(!file && !githubLink) || isUploading}
              >
                Analyze & Continue
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
