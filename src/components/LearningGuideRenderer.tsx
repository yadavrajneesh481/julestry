'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, HelpCircle, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { LearningGuide, Section, ContentBlock, QuizBlock, ToggleBlock, GlossaryTerm } from '@/types/learning-guide';
import { Button, Card, cn } from '@/components/ui/common';
import Mermaid from './Mermaid';

// --- Text Block ---
// Supports basic markdown-like bolding for now.
const TextRenderer = ({ content }: { content: string }) => {
  // Simple parser to handle bold text (**text**) and newlines
  const parts = content.split(/(\*\*.*?\*\*|\n)/g);

  return (
    <div className="text-gray-700 leading-relaxed text-lg mb-4">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="text-indigo-700 font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part === '\n') return <br key={index} />;
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};

// --- Quiz Block ---
const QuizRenderer = ({ block }: { block: QuizBlock }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (id: string) => {
    if (showExplanation) return;
    setSelectedOption(id);
    setShowExplanation(true);
  };

  const isCorrect = selectedOption ? block.options.find(o => o.id === selectedOption)?.isCorrect : false;

  return (
    <Card className="p-6 my-6 border-l-4 border-l-indigo-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <HelpCircle className="text-indigo-500" />
        {block.question}
      </h3>
      <div className="space-y-3">
        {block.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={showExplanation}
            className={cn(
              "w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center",
              showExplanation && option.isCorrect ? "border-green-500 bg-green-50" : "",
              showExplanation && !option.isCorrect && selectedOption === option.id ? "border-red-500 bg-red-50" : "",
              !showExplanation && selectedOption === option.id ? "border-indigo-500 bg-indigo-50" : "",
              !showExplanation && selectedOption !== option.id ? "border-gray-200 hover:border-indigo-300 hover:bg-gray-50" : ""
            )}
          >
            <span>{option.text}</span>
            {showExplanation && option.isCorrect && <CheckCircle className="text-green-600 w-5 h-5" />}
            {showExplanation && !option.isCorrect && selectedOption === option.id && <XCircle className="text-red-500 w-5 h-5" />}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={cn(
              "mt-4 p-4 rounded-lg",
              isCorrect ? "bg-green-100 text-green-800" : "bg-indigo-100 text-indigo-800"
            )}
          >
            <p className="font-medium">{isCorrect ? "Shabash! Sahi jawaab." : "Koi baat nahi, seekhte raho!"}</p>
            <p className="mt-1">{block.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

// --- Toggle Block ---
const ToggleRenderer = ({ block }: { block: ToggleBlock }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-teal-50 text-teal-900 rounded-lg hover:bg-teal-100 transition-colors font-semibold"
      >
        <span>{block.title}</span>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border border-teal-100 border-t-0 rounded-b-lg bg-white">
              {block.content.map((childBlock, idx) => (
                <ContentBlockRenderer key={idx} block={childBlock} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Content Block Dispatcher ---
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text':
      return <TextRenderer content={block.content} />;
    case 'image':
      // Using standard img tag for simplicity in mock, Next/Image requires configured domains
      /* eslint-disable-next-line @next/next/no-img-element */
      return (
        <figure className="my-6">
          <img
            src={block.url}
            alt={block.alt}
            className="w-full rounded-xl shadow-md object-cover max-h-96"
          />
          {block.caption && (
            <figcaption className="text-center text-gray-500 text-sm mt-2 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'mermaid':
      return <Mermaid chart={block.chart} caption={block.caption} />;
    case 'quiz':
      return <QuizRenderer block={block} />;
    case 'toggle':
      return <ToggleRenderer block={block} />;
    default:
      return null;
  }
};

// --- Main Learning Guide Renderer ---
interface LearningGuideRendererProps {
  guide: LearningGuide;
  onReset: () => void;
}

export default function LearningGuideRenderer({ guide, onReset }: LearningGuideRendererProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 tracking-tight">
          {guide.topic}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {guide.summary}
        </p>
      </div>

      {/* Glossary / Vocabulary */}
      {guide.glossary.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Vocabulary (Shabdkosh)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.glossary.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-md shadow-sm border border-yellow-100">
                <span className="font-bold text-gray-900 block">{item.term}</span>
                <span className="text-gray-600 text-sm">{item.definition}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sections */}
      <div className="space-y-16">
        {guide.sections.map((section, idx) => (
          <section key={section.id} className="relative">
             {/* Simple visual connector line */}
            {idx !== guide.sections.length - 1 && (
              <div className="absolute left-4 top-full h-16 w-0.5 bg-gray-200 -ml-px hidden md:block"></div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h2 className="text-2xl font-bold text-indigo-900">
                  <span className="text-indigo-400 mr-3">#{idx + 1}</span>
                  {section.title}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                {section.content.map((block, bIdx) => (
                  <ContentBlockRenderer key={bIdx} block={block} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="flex justify-center pt-8 pb-16">
        <Button onClick={onReset} variant="outline" size="lg">
          Create Another Guide
        </Button>
      </div>
    </div>
  );
}
