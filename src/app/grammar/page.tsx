import Link from 'next/link';
import { getTopics } from '@/lib/data';
import { BookOpen, Clock, History, Rocket, Activity, Text, Key, GitBranch } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Clock,
  History,
  Rocket,
  Activity,
  Text,
  Key,
  GitBranch,
};

const topicColors = [
  { bg: 'bg-[#ff4b4b]', border: 'border-[#ff4b4b]', light: 'bg-[#ff4b4b]/10', text: 'text-[#ff4b4b]' },
  { bg: 'bg-[#1cb0f6]', border: 'border-[#1cb0f6]', light: 'bg-[#1cb0f6]/10', text: 'text-[#1cb0f6]' },
  { bg: 'bg-[#58cc02]', border: 'border-[#58cc02]', light: 'bg-[#58cc02]/10', text: 'text-[#58cc02]' },
  { bg: 'bg-[#ffc800]', border: 'border-[#ffc800]', light: 'bg-[#ffc800]/10', text: 'text-[#cc9e00]' },
  { bg: 'bg-[#ce82ff]', border: 'border-[#ce82ff]', light: 'bg-[#ce82ff]/10', text: 'text-[#ce82ff]' },
  { bg: 'bg-[#ff9600]', border: 'border-[#ff9600]', light: 'bg-[#ff9600]/10', text: 'text-[#ff9600]' },
  { bg: 'bg-[#00d4aa]', border: 'border-[#00d4aa]', light: 'bg-[#00d4aa]/10', text: 'text-[#00a884]' },
];

export default async function GrammarPage() {
  const topics = await getTopics();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#3f3f3f] mb-8 text-center">
        Грамматика
      </h1>

      <div className="space-y-4">
        {topics.map((topic, i) => {
          const Icon = iconMap[topic.icon] || BookOpen;
          const color = topicColors[i % topicColors.length];
          return (
            <Link key={topic.id} href={`/grammar/${topic.slug}`}>
              <div className="flex items-center gap-4 rounded-2xl border-2 border-[#e5e5e5] bg-white p-5 transition-all hover:border-[#58cc02] hover:shadow-md">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${color.bg} text-white`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-extrabold text-[#3f3f3f]">{topic.title}</div>
                  <div className="text-base font-bold text-[#777] mt-0.5">
                    {topic._count.lessons} уроков
                  </div>
                </div>
                <div className={`rounded-lg px-3 py-1 text-sm font-bold ${color.light} ${color.text}`}>
                  Учить
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
