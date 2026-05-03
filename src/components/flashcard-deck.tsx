'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Word {
  id: string;
  english: string;
  russian: string;
  transcription?: string | null;
  example?: string | null;
  category: string;
  difficulty: number;
}

interface FlashcardDeckProps {
  words: Word[];
}

export function FlashcardDeck({ words }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Record<string, boolean>>({});
  const [showTranscription, setShowTranscription] = useState(true);

  if (words.length === 0) {
    return (
      <div className="text-center py-12 text-[#777] text-xl font-bold">
        Слов пока нет.
      </div>
    );
  }

  const word = words[index];
  const isLast = index === words.length - 1;
  const isFirst = index === 0;

  const handleNext = () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  };

  const handleKnown = () => {
    setKnown((k) => ({ ...k, [word.id]: true }));
    toast.success('Запомнено!');
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'word', entityId: word.id, completed: true, score: 5 }),
    });
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xp: 5 }),
    });
    handleNext();
  };

  const handleUnknown = () => {
    setKnown((k) => ({ ...k, [word.id]: false }));
    handleNext();
  };

  const handleRestart = () => {
    setIndex(0);
    setFlipped(false);
    setKnown({});
  };

  const knownCount = Object.values(known).filter(Boolean).length;

  if (Object.keys(known).length === words.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-7xl mb-6">🎉</div>
        <h3 className="text-4xl font-extrabold text-[#3f3f3f] mb-3">Сессия завершена!</h3>
        <p className="text-xl text-[#777] font-bold mb-8">
          Знаешь {knownCount} из {words.length} слов
        </p>
        <Button
          onClick={handleRestart}
          variant="outline"
          className="gap-2 text-lg font-bold h-14 px-8 rounded-xl border-2"
        >
          <RotateCw className="h-6 w-6" />
          Начать заново
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex items-center justify-between text-lg font-bold text-[#777]">
        <span>Карточка {index + 1} из {words.length}</span>
        <span className="flex items-center gap-2">
          <button
            onClick={() => setShowTranscription(!showTranscription)}
            className="flex items-center gap-1 text-base font-bold text-[#1cb0f6] hover:underline"
          >
            {showTranscription ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            Транскрипция
          </button>
          <span className="text-[#58cc02]">✓ {knownCount}</span>
        </span>
      </div>

      <div className="h-3 w-full rounded-full bg-[#e5e5e5] overflow-hidden">
        <motion.div
          className="h-full bg-[#58cc02] rounded-full"
          animate={{ width: `${(index / words.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* Card */}
      <div
        className="relative h-80 md:h-96 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={word.id + (flipped ? '-back' : '-front')}
            initial={{ opacity: 0, rotateY: flipped ? -90 : 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: flipped ? 90 : -90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Card className="h-full flex flex-col items-center justify-center text-center border-2 border-[#e5e5e5] shadow-none hover:border-[#58cc02]/30 transition-colors">
              <CardContent className="pt-6 space-y-5">
                {!flipped ? (
                  <>
                    <Badge className="text-base font-bold px-4 py-1.5 bg-[#f7f9fc] text-[#777] border-none">
                      {word.category}
                    </Badge>
                    <h2 className="text-6xl md:text-7xl font-extrabold text-[#3f3f3f]">{word.english}</h2>
                    {showTranscription && word.transcription && (
                      <p className="text-2xl text-[#777] font-mono font-bold">{word.transcription}</p>
                    )}
                    <p className="text-lg font-bold text-[#777]">Нажми, чтобы перевернуть</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-[#58cc02]">{word.russian}</h2>
                    {word.example && (
                      <p className="text-xl text-[#777] font-bold italic max-w-md">
                        &ldquo;{word.example}&rdquo;
                      </p>
                    )}
                    <p className="text-lg font-bold text-[#777]">Нажми, чтобы перевернуть</p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={isFirst}
          className="h-16 w-16 rounded-xl border-2 text-[#777]"
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2 text-lg font-bold h-16 px-8 rounded-xl border-2 border-[#ff4b4b]/30 text-[#ff4b4b] hover:bg-[#ff4b4b]/10 hover:text-[#ff4b4b]"
            onClick={handleUnknown}
          >
            Повторить
          </Button>
          <Button
            className="gap-2 text-xl font-extrabold h-16 px-10 rounded-xl bg-[#58cc02] hover:bg-[#4caf50] text-white shadow-[0_4px_0_#45a005] hover:shadow-[0_2px_0_#45a005] hover:translate-y-[2px] transition-all"
            onClick={handleKnown}
          >
            Знаю
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={isLast}
          className="h-16 w-16 rounded-xl border-2 text-[#777]"
        >
          <ChevronRight className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
