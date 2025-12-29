export type ContentType = 'text' | 'image' | 'mermaid' | 'quiz' | 'toggle';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizBlock {
  type: 'quiz';
  question: string;
  options: QuizOption[];
  explanation: string; // Explanation shown after answering
}

export interface TextBlock {
  type: 'text';
  content: string; // Markdown supported
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface MermaidBlock {
  type: 'mermaid';
  chart: string; // Mermaid code
  caption?: string;
}

export interface ToggleBlock {
  type: 'toggle';
  title: string;
  content: ContentBlock[]; // Nested content
}

export type ContentBlock = TextBlock | ImageBlock | MermaidBlock | QuizBlock | ToggleBlock;

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface LearningGuide {
  topic: string;
  summary: string; // High-level summary in Hinglish
  sections: Section[];
  glossary: GlossaryTerm[];
}
