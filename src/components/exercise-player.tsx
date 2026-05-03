'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Exercise {
  id: string;
  type: string;
  question: string;
  correctAnswer: string;
  options?: string | null;
  hint?: string | null;
  explanation?: string | null;
  difficulty: number;
}

interface ExercisePlayerProps {
  exercises: Exercise[];
}

function normalizeAnswer(ans: string): string {
  return ans
    .toLowerCase()
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isAnswerCorrect(user: string, correct: string): boolean {
  return normalizeAnswer(user) === normalizeAnswer(correct);
}

export function ExercisePlayer({ exercises }: ExercisePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        В этом уроке пока нет упражнений.
      </div>
    );
  }

  const exercise = exercises[currentIndex];
  const options = exercise.options ? JSON.parse(exercise.options) as string[] : null;
  const isLast = currentIndex === exercises.length - 1;

  const handleCheck = () => {
    if (!userAnswer.trim()) return;
    const correct = isAnswerCorrect(userAnswer, exercise.correctAnswer);
    setShowResult(correct ? 'correct' : 'wrong');
    setStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
    if (correct) {
      setCompleted((c) => ({ ...c, [exercise.id]: true }));
      toast.success('Правильно!', { description: exercise.explanation || 'Отличная работа!' });
    } else {
      toast.error('Неправильно', { description: 'Попробуйте ещё раз или посмотрите подсказку.' });
    }
  };

  const handleNext = () => {
    if (isLast) {
      // finish
    } else {
      setCurrentIndex((i) => i + 1);
      setUserAnswer('');
      setShowResult('idle');
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowResult('idle');
    setShowHint(false);
    setCompleted({});
    setStats({ correct: 0, total: 0 });
  };

  const allCompleted = Object.keys(completed).length === exercises.length && exercises.length > 0;

  if (allCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <Trophy className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Урок пройден!</h3>
        <p className="text-muted-foreground mb-6">
          Вы решили {stats.correct} из {stats.total} заданий правильно.
        </p>
        <Button onClick={handleRestart} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Пройти снова
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Задание {currentIndex + 1} из {exercises.length}
        </span>
        <span>
          Правильно: {stats.correct} / {stats.total}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + (showResult === 'correct' ? 1 : 0)) / exercises.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={exercise.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {exercise.type === 'translation' && 'Перевод'}
                  {exercise.type === 'quiz' && 'Тест'}
                  {exercise.type === 'fillblank' && 'Пропуск'}
                </Badge>
                <div className="flex gap-1">
                  {Array.from({ length: exercise.difficulty }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-amber-400" />
                  ))}
                </div>
              </div>
              <CardTitle className="text-xl mt-3 font-medium leading-relaxed">
                {exercise.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {options ? (
                <div className="grid gap-2">
                  {options.map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => setUserAnswer(opt)}
                      className={`text-left rounded-lg border px-4 py-3 text-sm transition-all ${
                        userAnswer === opt
                          ? 'border-primary bg-primary/5 text-primary font-medium'
                          : 'border-border hover:border-primary/50 hover:bg-accent'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <Input
                  placeholder="Введите ваш ответ..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && showResult === 'idle' && handleCheck()}
                  disabled={showResult !== 'idle'}
                  className="text-base"
                />
              )}

              {exercise.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-xs text-amber-600 hover:underline"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
                </button>
              )}

              <AnimatePresence>
                {showHint && exercise.hint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800"
                  >
                    <span className="font-medium">Подсказка:</span> {exercise.hint}
                  </motion.div>
                )}
              </AnimatePresence>

              {showResult === 'wrong' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                >
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Неправильно</p>
                      <p className="mt-1">
                        Правильный ответ: <span className="font-semibold">{exercise.correctAnswer}</span>
                      </p>
                      {exercise.explanation && <p className="mt-1 text-red-600/80">{exercise.explanation}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {showResult === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Правильно!</p>
                      {exercise.explanation && <p className="mt-1 text-emerald-600/80">{exercise.explanation}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-2 pt-2">
                {showResult === 'idle' ? (
                  <Button onClick={handleCheck} disabled={!userAnswer.trim()} className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Проверить
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="gap-2">
                    {isLast ? 'Завершить' : 'Далее'}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                {showResult === 'wrong' && (
                  <Button variant="outline" onClick={() => { setShowResult('idle'); setUserAnswer(''); }}>
                    Попробовать снова
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
