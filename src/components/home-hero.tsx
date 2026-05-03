'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Brain, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HomeHeroProps {
  totalTopics: number;
  totalExercises: number;
  totalWords: number;
}

export function HomeHero({ totalTopics, totalExercises, totalWords }: HomeHeroProps) {
  return (
    <div className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Интерактивная платформа
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Учите английский
          <br />
          <span className="text-primary/80">эффективно и красиво</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
          Теория, практика и словарный запас в одном месте. Переводите предложения, 
          тренируйте времена и расширяйте словарь через интерактивные задания.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/grammar">
            <Button size="lg" className="gap-2">
              Начать обучение
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/practice">
            <Button size="lg" variant="outline" className="gap-2">
              <Brain className="h-4 w-4" />
              Практика
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-3xl font-bold">{totalTopics}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Тем</div>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-3xl font-bold">{totalExercises}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Заданий</div>
        </div>
        <div className="rounded-2xl border bg-card p-4 col-span-2 md:col-span-1">
          <div className="text-3xl font-bold">{totalWords}+</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Слов</div>
        </div>
      </div>
    </div>
  );
}
