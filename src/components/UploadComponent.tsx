import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const UploadComponent = () => {
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
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file && !githubLink) {
      alert("Please upload a project file or enter a GitHub repository URL");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    // Simulate API request delay
    setTimeout(() => {
      clearInterval(timer);
      setUploadProgress(100);
      
      setTimeout(() => {
        navigate('/setup');
      }, 500);
    }, 4000);
  };

  const renderUploadZone = () => (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isDragging ? 'border-navy-600 bg-navy-50' : 'border-slate-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto w-16 h-16 mb-4 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">Drag and drop your project file</h3>
      <p className="text-slate-500 mb-4">or browse to upload</p>
      <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
        Choose File
      </Button>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept=".zip,.rar,.7z,.gz,.tar"
        onChange={handleFileChange}
      />
      {file && (
        <div className="mt-4 text-sm text-slate-600">
          <span className="font-medium">Selected file:</span> {file.name} ({Math.round(file.size / 1024)} KB)
        </div>
      )}
    </div>
  );

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-semibold mb-6">Upload Your Project</h1>
      <p className="text-slate-600 mb-8">
        Upload your project files or provide a GitHub repository link to begin. Our AI will analyze your code to generate relevant interview questions.
      </p>
      
      {isUploading ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Analyzing your project...</h2>
          <Progress value={uploadProgress} className="mb-2" />
          <p className="text-sm text-slate-500">This may take a few moments depending on the project size</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderUploadZone()}
          
          <div className="flex items-center">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="px-4 text-sm text-slate-500">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="github-link" className="text-sm font-medium">
              GitHub Repository URL
            </label>
            <input
              id="github-link"
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="https://github.com/username/repo"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="project-description" className="text-sm font-medium">
              Project Description (Optional)
            </label>
            <Textarea
              id="project-description"
              placeholder="Briefly describe your project, technologies used, and your role"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Back
            </Button>
            <Button type="submit">
              Continue
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadComponent;
