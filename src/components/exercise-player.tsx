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

function expandContractions(ans: string): string {
  const map: Record<string, string> = {
    "don't": 'do not',
    "doesn't": 'does not',
    "didn't": 'did not',
    "won't": 'will not',
    "wouldn't": 'would not',
    "can't": 'cannot',
    "couldn't": 'could not',
    "shouldn't": 'should not',
    "mustn't": 'must not',
    "mightn't": 'might not',
    "needn't": 'need not',
    "shan't": 'shall not',
    "isn't": 'is not',
    "aren't": 'are not',
    "wasn't": 'was not',
    "weren't": 'were not',
    "hasn't": 'has not',
    "haven't": 'have not',
    "hadn't": 'had not',
    "i'm": 'i am',
    "you're": 'you are',
    "we're": 'we are',
    "they're": 'they are',
    "i've": 'i have',
    "you've": 'you have',
    "we've": 'we have',
    "they've": 'they have',
    "i'll": 'i will',
    "you'll": 'you will',
    "he'll": 'he will',
    "she'll": 'she will',
    "it'll": 'it will',
    "we'll": 'we will',
    "they'll": 'they will',
    "i'd": 'i would',
    "you'd": 'you would',
    "he'd": 'he would',
    "she'd": 'she would',
    "it'd": 'it would',
    "we'd": 'we would',
    "they'd": 'they would',
    "he's": 'he is',
    "she's": 'she is',
    "it's": 'it is',
    "that's": 'that is',
    "what's": 'what is',
    "who's": 'who is',
    "where's": 'where is',
    "when's": 'when is',
    "why's": 'why is',
    "how's": 'how is',
    "let's": 'let us',
    "there's": 'there is',
    "here's": 'here is',
  };

  let result = ans.toLowerCase();
  for (const [contraction, expanded] of Object.entries(map)) {
    const regex = new RegExp(`\\b${contraction}\\b`, 'g');
    result = result.replace(regex, expanded);
  }
  return result;
}

function normalizeAnswer(ans: string): string {
  return expandContractions(ans)
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isAnswerCorrect(user: string, correct: string): boolean {
  const u = normalizeAnswer(user);
  const c = normalizeAnswer(correct);
  return u === c || u.startsWith(c) || c.startsWith(u);
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
      <div className="text-center py-12 text-[#777] text-lg font-bold">
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
      // Save progress
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'exercise', entityId: exercise.id, completed: true, score: 10 }),
      });
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xp: 10 }),
      });
    } else {
      toast.error('Неправильно', { description: 'Попробуй ещё раз или посмотри подсказку.' });
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
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#58cc02]/20 text-[#58cc02] mb-6">
          <Trophy className="h-10 w-10" />
        </div>
        <h3 className="text-3xl font-extrabold text-[#3f3f3f] mb-3">Урок пройден!</h3>
        <p className="text-lg text-[#777] font-bold mb-8">
          {stats.correct} из {stats.total} правильно
        </p>
        <Button onClick={handleRestart} variant="outline" className="gap-2 text-base font-bold h-12 px-6">
          <RotateCcw className="h-5 w-5" />
          Пройти снова
        </Button>
      </motion.div>
    );
  }

  const typeLabel =
    exercise.type === 'translation' ? 'Перевод' :
    exercise.type === 'quiz' ? 'Тест' :
    exercise.type === 'fillblank' ? 'Пропуск' : 'Задание';

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-base font-bold text-[#777]">
        <span>Задание {currentIndex + 1} из {exercises.length}</span>
        <span className="text-[#58cc02]">✓ {stats.correct}</span>
      </div>
      <div className="h-3 w-full rounded-full bg-[#e5e5e5] overflow-hidden">
        <motion.div
          className="h-full bg-[#58cc02] rounded-full"
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
          <Card className="border-2 border-[#e5e5e5] shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="text-sm font-bold px-3 py-1 bg-[#f7f9fc] text-[#777] border-none">
                  {typeLabel}
                </Badge>
                <div className="flex gap-1.5">
                  {Array.from({ length: exercise.difficulty }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-[#ffc800]" />
                  ))}
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-extrabold text-[#3f3f3f] mt-4 leading-snug">
                {exercise.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {options ? (
                <div className="grid gap-3">
                  {options.map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => setUserAnswer(opt)}
                      className={`text-left rounded-xl border-2 px-6 py-5 text-xl font-bold transition-all ${
                        userAnswer === opt
                          ? 'border-[#1cb0f6] bg-[#1cb0f6]/10 text-[#1cb0f6]'
                          : 'border-[#e5e5e5] hover:border-[#1cb0f6]/50 hover:bg-[#f7f9fc] text-[#3f3f3f]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <Input
                  placeholder="Введи ответ..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && showResult === 'idle' && handleCheck()}
                  disabled={showResult !== 'idle'}
                  className="text-2xl font-bold h-16 rounded-xl border-2 border-[#e5e5e5] focus:border-[#58cc02] focus:ring-[#58cc02]"
                />
              )}

              {exercise.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-lg font-bold text-[#ffc800] hover:underline"
                >
                  <Lightbulb className="h-6 w-6" />
                  {showHint ? 'Скрыть подсказку' : 'Подсказка'}
                </button>
              )}

              <AnimatePresence>
                {showHint && exercise.hint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl bg-[#ffc800]/15 border-2 border-[#ffc800]/30 px-6 py-5 text-lg font-bold text-[#cc9e00]"
                  >
                    💡 {exercise.hint}
                  </motion.div>
                )}
              </AnimatePresence>

              {showResult === 'wrong' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-[#ff4b4b]/10 border-2 border-[#ff4b4b]/30 px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 shrink-0 mt-0.5 text-[#ff4b4b]" />
                    <div>
                      <p className="font-extrabold text-[#ff4b4b] text-xl">Неправильно</p>
                      <p className="mt-1 text-lg font-bold text-[#3f3f3f]">
                        Правильно: <span className="text-[#58cc02]">{exercise.correctAnswer}</span>
                      </p>
                      {exercise.explanation && (
                        <p className="mt-1 text-lg font-bold text-[#777]">{exercise.explanation}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {showResult === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-[#58cc02]/10 border-2 border-[#58cc02]/30 px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5 text-[#58cc02]" />
                    <div>
                      <p className="font-extrabold text-[#58cc02] text-xl">Правильно!</p>
                      {exercise.explanation && (
                        <p className="mt-1 text-lg font-bold text-[#3f3f3f]">{exercise.explanation}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3 pt-2">
                {showResult === 'idle' ? (
                  <Button
                    onClick={handleCheck}
                    disabled={!userAnswer.trim()}
                    className="gap-2 text-xl font-extrabold h-16 px-10 rounded-xl bg-[#58cc02] hover:bg-[#4caf50] shadow-[0_4px_0_#45a005] hover:shadow-[0_2px_0_#45a005] hover:translate-y-[2px] transition-all"
                  >
                    <CheckCircle2 className="h-6 w-6" />
                    Проверить
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="gap-2 text-xl font-extrabold h-16 px-10 rounded-xl bg-[#58cc02] hover:bg-[#4caf50] shadow-[0_4px_0_#45a005] hover:shadow-[0_2px_0_#45a005] hover:translate-y-[2px] transition-all"
                  >
                    {isLast ? 'Завершить' : 'Далее'}
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                )}
                {showResult === 'wrong' && (
                  <Button
                    variant="outline"
                    onClick={() => { setShowResult('idle'); setUserAnswer(''); }}
                    className="text-lg font-bold h-16 px-8 rounded-xl border-2"
                  >
                    Ещё раз
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
