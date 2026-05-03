import { getTopics, getProgressSummary } from '@/lib/data';
import { CheckCircle2, Lock, Circle, Trophy, BookOpen, Brain, MessageCircle, Headphones } from 'lucide-react';
import Link from 'next/link';

interface Unit {
  id: string;
  title: string;
  level: string;
  levelColor: string;
  topics: string[];
  icon: React.ElementType;
  status: 'locked' | 'available' | 'completed';
}

const courseUnits: Unit[] = [
  {
    id: 'a1-u1', title: 'База', level: 'A1', levelColor: 'bg-[#58cc02]',
    topics: ['To Be', 'Местоимения', 'A/An', 'Приветствия'], icon: BookOpen, status: 'available',
  },
  {
    id: 'a1-u2', title: 'Моя семья', level: 'A1', levelColor: 'bg-[#58cc02]',
    topics: ['Present Simple', 'Притяжательные', 'Семья', 'Числа'], icon: BookOpen, status: 'available',
  },
  {
    id: 'a1-u3', title: 'Еда и напитки', level: 'A1', levelColor: 'bg-[#58cc02]',
    topics: ['Some/Any', 'Исчисляемые', 'Ресторан'], icon: Brain, status: 'locked',
  },
  {
    id: 'a1-u4', title: 'Мой день', level: 'A1', levelColor: 'bg-[#58cc02]',
    topics: ['Present Simple', 'Время', 'Routine'], icon: Brain, status: 'locked',
  },
  {
    id: 'a1-u5', title: 'Город', level: 'A1', levelColor: 'bg-[#58cc02]',
    topics: ['Предлоги места', 'There is/are', 'Дорога'], icon: MessageCircle, status: 'locked',
  },
  {
    id: 'a2-u1', title: 'Прошлое', level: 'A2', levelColor: 'bg-[#1cb0f6]',
    topics: ['Past Simple', 'Was/were', 'Детство'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'a2-u2', title: 'Будущее', level: 'A2', levelColor: 'bg-[#1cb0f6]',
    topics: ['Future Simple', 'Going to', 'Планы'], icon: Brain, status: 'locked',
  },
  {
    id: 'a2-u3', title: 'Сейчас', level: 'A2', levelColor: 'bg-[#1cb0f6]',
    topics: ['Present Continuous', 'Simple vs Continuous'], icon: Brain, status: 'locked',
  },
  {
    id: 'a2-u4', title: 'Модальные', level: 'A2', levelColor: 'bg-[#1cb0f6]',
    topics: ['Can/Could', 'Must/Have to', 'Should'], icon: MessageCircle, status: 'locked',
  },
  {
    id: 'a2-u5', title: 'Путешествия', level: 'A2', levelColor: 'bg-[#1cb0f6]',
    topics: ['Предлоги движения', 'Транспорт', 'Аэропорт'], icon: Headphones, status: 'locked',
  },
  {
    id: 'b1-u1', title: 'Опыт', level: 'B1', levelColor: 'bg-[#ffc800]',
    topics: ['Present Perfect', 'Ever/Never', 'Just/Already'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'b1-u2', title: 'Условия', level: 'B1', levelColor: 'bg-[#ffc800]',
    topics: ['First Conditional', 'Second Conditional', 'If/Unless'], icon: Brain, status: 'locked',
  },
  {
    id: 'b1-u3', title: 'Пассив', level: 'B1', levelColor: 'bg-[#ffc800]',
    topics: ['Passive Voice', 'Новости', 'Инструкции'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'b1-u4', title: 'Фразовые глаголы', level: 'B1', levelColor: 'bg-[#ffc800]',
    topics: ['Get up', 'Turn on', 'Look for', 'Give up'], icon: MessageCircle, status: 'locked',
  },
  {
    id: 'b1-u5', title: 'Эмоции', level: 'B1', levelColor: 'bg-[#ffc800]',
    topics: ['-ed/-ing', 'Too/Enough', 'Мнения'], icon: Headphones, status: 'locked',
  },
  {
    id: 'b2-u1', title: 'Сложные условия', level: 'B2', levelColor: 'bg-[#ce82ff]',
    topics: ['Third Conditional', 'Mixed', 'Wish/If only'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'b2-u2', title: 'Косвенная речь', level: 'B2', levelColor: 'bg-[#ce82ff]',
    topics: ['Reported Speech', 'Say/Tell/Ask', 'Временные сдвиги'], icon: Brain, status: 'locked',
  },
  {
    id: 'b2-u3', title: 'Сложные времена', level: 'B2', levelColor: 'bg-[#ce82ff]',
    topics: ['Past Perfect', 'Future Perfect', 'Continuous'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'b2-u4', title: 'Идиомы', level: 'B2', levelColor: 'bg-[#ce82ff]',
    topics: ['Разговорные фразы', 'Сленг', 'Регистры'], icon: MessageCircle, status: 'locked',
  },
  {
    id: 'b2-u5', title: 'Дискуссии', level: 'B2', levelColor: 'bg-[#ce82ff]',
    topics: ['Linking words', 'Эссе', 'Дебаты'], icon: Headphones, status: 'locked',
  },
  {
    id: 'c1-u1', title: 'Сослагательное', level: 'C1', levelColor: 'bg-[#ff4b4b]',
    topics: ['Subjunctive', 'Inversion', 'Emphasis'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'c1-u2', title: 'Академский', level: 'C1', levelColor: 'bg-[#ff4b4b]',
    topics: ['Статьи', 'Hedging', 'Цитирование'], icon: Brain, status: 'locked',
  },
  {
    id: 'c1-u3', title: 'Нюансы', level: 'C1', levelColor: 'bg-[#ff4b4b]',
    topics: ['Get + причастие', 'Gerunds', 'Raise/Rise'], icon: BookOpen, status: 'locked',
  },
  {
    id: 'c2-u1', title: 'Стилистика', level: 'C2', levelColor: 'bg-[#3f3f3f]',
    topics: ['Официальный стиль', 'Euphemisms', 'Irony'], icon: MessageCircle, status: 'locked',
  },
  {
    id: 'c2-u2', title: 'Литература', level: 'C2', levelColor: 'bg-[#3f3f3f]',
    topics: ['Анализ текстов', 'Сатира', 'Подкасты'], icon: Headphones, status: 'locked',
  },
];

const levelNames: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper-Intermediate',
  C1: 'Advanced',
  C2: 'Proficiency',
};

export default async function RoadmapPage() {
  const progress = await getProgressSummary();
  const grammarTopics = await getTopics();

  // Mark available units based on existing grammar topics
  const availableSlugs = new Set(grammarTopics.map((t) => t.slug));
  const unitsWithStatus = courseUnits.map((u) => {
    if (u.level === 'A1' && availableSlugs.size > 0) {
      return { ...u, status: 'available' as const };
    }
    return u;
  });

  // Group by level
  const byLevel: Record<string, Unit[]> = {};
  for (const u of unitsWithStatus) {
    if (!byLevel[u.level]) byLevel[u.level] = [];
    byLevel[u.level].push(u);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#3f3f3f] mb-3">
          План курса
        </h1>
        <p className="text-xl text-[#777] font-bold">
          {progress.exerciseProgress} заданий решено · {progress.wordProgress} слов изучено
        </p>
      </div>

      <div className="space-y-12">
        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => {
          const units = byLevel[level] || [];
          if (units.length === 0) return null;

          return (
            <div key={level}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-4 h-4 rounded-full ${units[0].levelColor}`} />
                <h2 className="text-3xl font-extrabold text-[#3f3f3f]">
                  {level} — {levelNames[level]}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {units.map((unit) => {
                  const Icon = unit.icon;
                  const isCompleted = unit.status === 'completed';
                  const isAvailable = unit.status === 'available';
                  const isLocked = unit.status === 'locked';

                  return (
                    <div
                      key={unit.id}
                      className={`relative rounded-2xl border-2 p-5 transition-all ${
                        isCompleted
                          ? 'border-[#58cc02] bg-[#58cc02]/5'
                          : isAvailable
                          ? 'border-[#e5e5e5] bg-white hover:border-[#58cc02]/50 hover:shadow-md'
                          : 'border-[#e5e5e5] bg-[#f7f9fc] opacity-70'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${unit.levelColor} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        {isCompleted && <CheckCircle2 className="h-6 w-6 text-[#58cc02]" />}
                        {isLocked && <Lock className="h-5 w-5 text-[#777]" />}
                        {isAvailable && !isCompleted && <Circle className="h-5 w-5 text-[#58cc02]" />}
                      </div>

                      <h3 className="text-xl font-extrabold text-[#3f3f3f] mb-1">{unit.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {unit.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-lg bg-[#f7f9fc] px-2.5 py-1 text-sm font-bold text-[#777]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-14 rounded-2xl border-2 border-[#e5e5e5] bg-white p-6">
        <h3 className="text-xl font-extrabold text-[#3f3f3f] mb-4">Методики в основе</h3>
        <div className="grid md:grid-cols-2 gap-4 text-lg text-[#3f3f3f]">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎮</span>
            <div>
              <strong className="font-extrabold">Геймификация</strong> — streak, XP, уровни, достижения (как в Duolingo)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <strong className="font-extrabold">SRS</strong> — интервальное повторение слов и тем (как в Anki)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <strong className="font-extrabold">Структурированная грамматика</strong> — теория + диалоги (как в Babbel)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎧</span>
            <div>
              <strong className="font-extrabold">Погружение</strong> — тексты и аудио чуть выше уровня (Comprehensible Input)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
