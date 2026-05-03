import Link from 'next/link';
import { BookOpen, Brain, Layers, Flame, Star } from 'lucide-react';
import { getExerciseStats, getProgressSummary } from '@/lib/data';

export default async function HomePage() {
  const stats = await getExerciseStats();
  const progress = await getProgressSummary();

  const exercisePct = progress.totalExercises > 0
    ? Math.round((progress.exerciseProgress / progress.totalExercises) * 100)
    : 0;
  const wordPct = progress.totalWords > 0
    ? Math.round((progress.wordProgress / progress.totalWords) * 100)
    : 0;

  const sections = [
    {
      icon: BookOpen,
      title: 'Грамматика',
      desc: `${stats.totalTopics} тем`,
      href: '/grammar',
      bg: 'bg-[#58cc02]',
      hover: 'hover:bg-[#4caf50]',
      shadow: 'shadow-[0_6px_0_#45a005]',
      hoverShadow: 'hover:shadow-[0_4px_0_#45a005] hover:translate-y-[2px]',
    },
    {
      icon: Brain,
      title: 'Практика',
      desc: `${stats.totalExercises} заданий`,
      href: '/practice',
      bg: 'bg-[#1cb0f6]',
      hover: 'hover:bg-[#1899d6]',
      shadow: 'shadow-[0_6px_0_#1583b5]',
      hoverShadow: 'hover:shadow-[0_4px_0_#1583b5] hover:translate-y-[2px]',
    },
    {
      icon: Layers,
      title: 'Слова',
      desc: `${stats.totalWords}+ слов`,
      href: '/words',
      bg: 'bg-[#ffc800]',
      hover: 'hover:bg-[#e6b400]',
      shadow: 'shadow-[0_6px_0_#cc9e00]',
      hoverShadow: 'hover:shadow-[0_4px_0_#cc9e00] hover:translate-y-[2px]',
      textColor: 'text-[#3f3f3f]',
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#3f3f3f] mb-4">
          Учим английский
        </h1>
        <p className="text-2xl text-[#777]">
          Выбери, чем хочешь заняться
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border-2 border-[#e5e5e5] bg-white p-5">
          <div className="flex items-center gap-2 text-[#ff9600] font-extrabold text-lg mb-2">
            <Flame className="h-5 w-5" />
            {progress.stats.streak} дней
          </div>
          <div className="text-base text-[#777] font-bold">Серия занятий</div>
        </div>
        <div className="rounded-2xl border-2 border-[#e5e5e5] bg-white p-5">
          <div className="flex items-center gap-2 text-[#58cc02] font-extrabold text-lg mb-2">
            <Star className="h-5 w-5" />
            {progress.stats.totalXP} XP
          </div>
          <div className="text-base text-[#777] font-bold">Уровень {progress.stats.level}</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-4 mb-8">
        <div className="rounded-2xl border-2 border-[#e5e5e5] bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-extrabold text-[#3f3f3f]">Грамматика</span>
            <span className="text-base font-bold text-[#777]">{progress.exerciseProgress} / {progress.totalExercises}</span>
          </div>
          <div className="h-4 w-full rounded-full bg-[#e5e5e5] overflow-hidden">
            <div className="h-full bg-[#58cc02] rounded-full transition-all" style={{ width: `${exercisePct}%` }} />
          </div>
          <div className="text-right text-sm font-bold text-[#777] mt-1">{exercisePct}%</div>
        </div>
        <div className="rounded-2xl border-2 border-[#e5e5e5] bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-extrabold text-[#3f3f3f]">Слова</span>
            <span className="text-base font-bold text-[#777]">{progress.wordProgress} / {progress.totalWords}</span>
          </div>
          <div className="h-4 w-full rounded-full bg-[#e5e5e5] overflow-hidden">
            <div className="h-full bg-[#ffc800] rounded-full transition-all" style={{ width: `${wordPct}%` }} />
          </div>
          <div className="text-right text-sm font-bold text-[#777] mt-1">{wordPct}%</div>
        </div>
      </div>

      {/* Big colorful buttons */}
      <div className="space-y-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <div
              className={`flex items-center gap-5 rounded-2xl p-6 md:p-7 text-white transition-all ${s.bg} ${s.hover} ${s.shadow} ${s.hoverShadow} ${s.textColor || ''}`}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <s.icon className="h-8 w-8" />
              </div>
              <div>
                <div className="text-3xl font-extrabold">{s.title}</div>
                <div className={`text-lg font-bold opacity-90 ${s.textColor ? 'text-[#3f3f3f]/70' : ''}`}>
                  {s.desc}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Daily tip */}
      <div className="mt-10 rounded-2xl border-2 border-[#e5e5e5] bg-white p-6 text-center">
        <div className="text-xl font-bold text-[#3f3f3f] mb-2">💡 Совет дня</div>
        <p className="text-lg text-[#777]">
          Регулярность важнее интенсивности. Лучше 15 минут каждый день, чем 2 часа раз в неделю.
        </p>
      </div>
    </div>
  );
}
