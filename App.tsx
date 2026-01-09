
import React, { useState, useCallback, useRef } from 'react';
import { DesignState } from './types';
import { DEFAULT_DESIGN } from './constants';
import Sidebar from './components/Sidebar';
import PreviewCanvas from './components/PreviewCanvas';
import Header from './components/Header';
import { analyzeLayout } from './services/geminiService';

const App: React.FC = () => {
  const [design, setDesign] = useState<DesignState>(DEFAULT_DESIGN);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (updates: Partial<DesignState>) => {
    setDesign(prev => ({ ...prev, ...updates }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        triggerAIAnalysis(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAIAnalysis = async (image: string) => {
    setIsAnalyzing(true);
    setFeedback("Gemini is analyzing your layout...");
    const result = await analyzeLayout(image);
    setFeedback(result || "Analysis complete.");
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans-modern">
      <Header 
        onUpload={() => fileInputRef.current?.click()} 
        isImageLoaded={!!uploadedImage}
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload}
      />

      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Controls */}
        <aside className="w-[380px] border-r border-slate-200 bg-white overflow-y-auto z-10 shadow-xl">
          <Sidebar 
            design={design} 
            onUpdate={handleUpdate} 
            feedback={feedback} 
            isAnalyzing={isAnalyzing}
          />
        </aside>

        {/* Center - Preview Area */}
        <section className="flex-1 relative bg-[#e2e8f0] overflow-y-auto p-4 md:p-12">
          {uploadedImage ? (
            <PreviewCanvas 
              design={design} 
              image={uploadedImage} 
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-3xl m-8">
              <div className="w-16 h-16 mb-4 bg-slate-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium">No image uploaded</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Upload Layout Screenshot
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
