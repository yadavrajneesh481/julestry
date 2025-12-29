'use client';

import React, { useState } from 'react';
import { Upload, Link as LinkIcon, FileText, Loader2, Sparkles } from 'lucide-react';
import { Button, Card, cn } from '@/components/ui/common';
import LearningGuideRenderer from '@/components/LearningGuideRenderer';
import { LearningGuide } from '@/types/learning-guide';

type InputType = 'text' | 'file' | 'url';

export default function Home() {
  const [activeTab, setActiveTab] = useState<InputType>('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<LearningGuide | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: activeTab }),
      });

      if (!res.ok) throw new Error('Failed to generate guide');

      const data = await res.json();
      setGuide(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setGuide(null);
    setContent('');
    setError(null);
  };

  if (guide) {
    return <LearningGuideRenderer guide={guide} onReset={reset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center p-4 font-sans text-gray-900">

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
          <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
          <span className="font-bold text-indigo-900 tracking-wide">Hinglish Learning Platform</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-950 tracking-tight mb-4">
          Turn Boring Study Notes into <span className="text-indigo-600">Fun Guides!</span>
        </h1>
        <p className="text-xl text-gray-600">
          Upload your material, and we'll transform it into simple Hinglish explanations with diagrams and quizzes.
        </p>
      </div>

      {/* Input Card */}
      <Card className="w-full max-w-2xl p-2 md:p-6 bg-white/80 backdrop-blur-sm border-indigo-100 shadow-xl">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('text')}
            className={cn(
              "flex-1 py-3 text-center font-medium transition-colors border-b-2 flex items-center justify-center gap-2",
              activeTab === 'text' ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <FileText className="w-4 h-4" /> Text
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={cn(
              "flex-1 py-3 text-center font-medium transition-colors border-b-2 flex items-center justify-center gap-2",
              activeTab === 'file' ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <Upload className="w-4 h-4" /> File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={cn(
              "flex-1 py-3 text-center font-medium transition-colors border-b-2 flex items-center justify-center gap-2",
              activeTab === 'url' ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <LinkIcon className="w-4 h-4" /> URL
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="min-h-[200px]">
            {activeTab === 'text' && (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your study notes here... (e.g. 'Photosynthesis is the process...')"
                className="w-full h-48 p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none transition-all outline-none"
              />
            )}

            {activeTab === 'file' && (
              <div className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-not-allowed">
                <Upload className="w-10 h-10 mb-2 opacity-50" />
                <p>File upload coming soon!</p>
                <p className="text-xs mt-2 text-indigo-500 font-medium cursor-pointer" onClick={() => {
                  setActiveTab('text');
                  setContent('Photosynthesis process notes...');
                }}>
                  Use text for demo
                </p>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="h-48 flex flex-col justify-center gap-2">
                 <input
                  type="url"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="https://wikipedia.org/wiki/..."
                  className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                 />
                 <p className="text-sm text-gray-500 px-1">
                   Paste a link to an article or video.
                 </p>
              </div>
            )}
          </div>

          {error && (
             <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">
               {error}
             </div>
          )}

          <Button
            type="submit"
            className="w-full py-4 text-lg shadow-indigo-200 shadow-lg"
            disabled={loading || (activeTab === 'file')}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Magic...
              </>
            ) : (
              'Generate Guide'
            )}
          </Button>
        </form>
      </Card>

      <p className="mt-8 text-sm text-gray-400">
        Powered by AI • Learning made fun
      </p>
    </div>
  );
}
