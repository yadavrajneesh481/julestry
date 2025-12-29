'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  caption?: string;
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Initialize only once if possible, or ensure settings are correct
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      fontFamily: 'inherit',
      securityLevel: 'loose',
    });

    const renderChart = async () => {
      if (ref.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          // mermaid.render returns an object { svg }
          const { svg } = await mermaid.render(id, chart);
          setSvg(svg);
          setError(false);
        } catch (err) {
          console.error('Mermaid render error:', err);
          setError(true);
        }
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center text-sm">
        Failed to load diagram.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div ref={ref} className="w-full overflow-x-auto flex justify-center text-center">
         {/* If we have SVG, render it. Otherwise, keeping the ref div empty is fine for render() target usually,
             but mermaid.render creates a temporary div usually.
             Actually mermaid.render(id, text) returns SVG string, it doesn't need the ref to contain the text.
             We just put the result in dangerouslySetInnerHTML.
         */}
         {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
      </div>
      {caption && <p className="mt-2 text-sm text-gray-500 font-medium italic">{caption}</p>}
    </div>
  );
}
