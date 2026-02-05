
import React from 'react';
import { SearchResult } from '../types';

interface ResultDisplayProps {
  result: SearchResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  // Helper to parse Markdown-like syntax (bold, links, lists)
  const parseMarkdown = (line: string, key: number) => {
    if (line.startsWith('###')) {
      return <h3 key={key} className="text-xl font-bold text-slate-800 mt-6 mb-3">{line.replace('###', '').trim()}</h3>;
    }
    if (line.startsWith('##')) {
      return <h2 key={key} className="text-2xl font-bold text-indigo-700 mt-8 mb-4 border-b pb-2">{line.replace('##', '').trim()}</h2>;
    }
    if (line.startsWith('-') || line.startsWith('*')) {
      const content = line.replace(/^[-*]\s*/, '');
      return <li key={key} className="ml-4 mb-2 text-slate-700">{renderInline(content)}</li>;
    }
    if (line.trim() === '') return <div key={key} className="h-2" />;
    
    return (
      <p key={key} className="mb-4 text-slate-700 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  };

  const renderInline = (text: string) => {
    // Regex for bold **text** and links [text](url)
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 font-semibold">{part.slice(2, -2)}</strong>;
      }
      // Link
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [_, label, url] = linkMatch;
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium underline decoration-indigo-300 underline-offset-4 transition-colors"
          >
            {label}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      }
      return part;
    });
  };

  const formattedText = result.text.split('\n').map((line, i) => parseMarkdown(line, i));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 animate-fade-in">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800">Bandi e Concorsi Trovati</h2>
        </div>
        
        <div className="prose prose-indigo max-w-none">
          {formattedText}
        </div>
      </div>

      {result.sources.length > 0 && (
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Fonti di riferimento e Portali Ufficiali
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.sources.map((source, index) => {
              let hostname = "Link";
              try { hostname = new URL(source.uri).hostname; } catch(e) {}
              return (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-indigo-600">{source.title}</p>
                    <p className="text-xs text-slate-400 truncate">{hostname}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
