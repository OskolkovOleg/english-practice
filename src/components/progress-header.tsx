'use client';

import { useEffect, useState } from 'react';
import { Flame, Star, Zap } from 'lucide-react';

interface Stats {
  streak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
}

export function ProgressHeader() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ streak: 0, longestStreak: 0, totalXP: 0, level: 1 }));
  }, []);

  if (!stats) return null;

  const xpInLevel = stats.totalXP % 100;
  const xpPercent = xpInLevel;

  return (
    <div className="hidden md:flex items-center gap-4">
      <div className="flex items-center gap-1.5 text-base font-extrabold text-[#ff9600]">
        <Flame className="h-5 w-5" />
        {stats.streak}
      </div>
      <div className="flex items-center gap-1.5 text-base font-extrabold text-[#58cc02]">
        <Zap className="h-5 w-5" />
        {stats.totalXP} XP
      </div>
      <div className="flex items-center gap-1.5">
        <Star className="h-5 w-5 text-[#1cb0f6]" />
        <span className="text-base font-extrabold text-[#3f3f3f]">Lv. {stats.level}</span>
      </div>
      <div className="w-24 h-3 bg-[#e5e5e5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#58cc02] rounded-full transition-all"
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </div>
  );
}
