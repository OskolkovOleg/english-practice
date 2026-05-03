'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const calloutColors: Record<string, { border: string; bg: string; icon: string; title: string }> = {
  info:    { border: 'border-[#1cb0f6]',    bg: 'bg-[#1cb0f6]/8',  icon: 'ℹ️', title: 'text-[#1cb0f6]' },
  tip:     { border: 'border-[#58cc02]',    bg: 'bg-[#58cc02]/8',  icon: '💡', title: 'text-[#58cc02]' },
  warning: { border: 'border-[#ffc800]',    bg: 'bg-[#ffc800]/8',  icon: '⚠️', title: 'text-[#cc9e00]' },
  example: { border: 'border-[#ce82ff]',    bg: 'bg-[#ce82ff]/8',  icon: '📝', title: 'text-[#ce82ff]' },
  danger:  { border: 'border-[#ff4b4b]',    bg: 'bg-[#ff4b4b]/8',  icon: '🚨', title: 'text-[#ff4b4b]' },
};

function parseCallout(children: React.ReactNode): { type: string; title: string; body: React.ReactNode } | null {
  const text = React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('');

  const match = text.match(/^\[!\s*(\w+)\s*\]\s*(.*?)\n/);
  if (!match) return null;

  const type = match[1].toLowerCase();
  const title = match[2].trim();

  // Remove the first line from children
  const rest = text.slice(match[0].length);
  return { type, title, body: rest };
}

function Callout({ children }: { children: React.ReactNode }) {
  const parsed = parseCallout(children);
  if (!parsed) {
    return (
      <blockquote className="border-l-4 border-[#e5e5e5] pl-5 py-3 my-5 italic text-[#777] bg-[#f7f9fc] rounded-r-xl">
        {children}
      </blockquote>
    );
  }

  const style = calloutColors[parsed.type] || calloutColors.info;

  return (
    <div className={`rounded-xl border-l-4 ${style.border} ${style.bg} px-5 py-4 my-5`}>
      <div className={`font-extrabold text-lg mb-2 flex items-center gap-2 ${style.title}`}>
        <span>{style.icon}</span>
        <span>{parsed.title || parsed.type.toUpperCase()}</span>
      </div>
      <div className="text-[#3f3f3f] leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{parsed.body as string}</ReactMarkdown>
      </div>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3f3f3f] mt-10 mb-5 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#3f3f3f] mt-8 mb-4 leading-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-xl text-[#3f3f3f] leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-8 space-y-2 mb-6 text-xl text-[#3f3f3f]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-8 space-y-2 mb-6 text-xl text-[#3f3f3f]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-extrabold text-[#3f3f3f]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#555]">{children}</em>
          ),
          blockquote: ({ children }) => <Callout>{children}</Callout>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left border-collapse text-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#f7f9fc]">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-extrabold text-[#3f3f3f] border-b-2 border-[#e5e5e5]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-[#3f3f3f] border-b border-[#e5e5e5]">
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code className="bg-[#f7f9fc] text-[#ff4b4b] px-2 py-1 rounded-lg font-mono text-base">
              {children}
            </code>
          ),
          hr: () => <hr className="my-8 border-[#e5e5e5]" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
