'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCw, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
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
      <div className="text-center py-12 text-muted-foreground">
        В этой категории пока нет слов.
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
    toast.success('Отмечено как изученное');
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
        className="text-center py-12"
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Сессия завершена!</h3>
        <p className="text-muted-foreground mb-6">
          Вы знаете {knownCount} из {words.length} слов.
        </p>
        <Button onClick={handleRestart} variant="outline" className="gap-2">
          <RotateCw className="h-4 w-4" />
          Начать заново
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Карточка {index + 1} из {words.length}
        </span>
        <span className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-xs"
            onClick={() => setShowTranscription(!showTranscription)}
          >
            {showTranscription ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            Транскрипция
          </Button>
          <span className="text-emerald-600 font-medium">{knownCount} изучено</span>
        </span>
      </div>

      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${(index / words.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* Card */}
      <div className="relative h-80 cursor-pointer perspective-1000" onClick={() => setFlipped(!flipped)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={word.id + (flipped ? '-back' : '-front')}
            initial={{ opacity: 0, rotateY: flipped ? -90 : 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: flipped ? 90 : -90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Card className="h-full flex flex-col items-center justify-center text-center border-2 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6 space-y-4">
                {!flipped ? (
                  <>
                    <Badge variant="secondary" className="text-xs">{word.category}</Badge>
                    <h2 className="text-4xl font-bold tracking-tight">{word.english}</h2>
                    {showTranscription && word.transcription && (
                      <p className="text-lg text-muted-foreground font-mono">{word.transcription}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Нажмите, чтобы перевернуть</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold">{word.russian}</h2>
                    {word.example && (
                      <p className="text-muted-foreground italic max-w-md">&ldquo;{word.example}&rdquo;</p>
                    )}
                    <p className="text-sm text-muted-foreground">Нажмите, чтобы перевернуть</p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" size="icon" onClick={handlePrev} disabled={isFirst}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-red-200 hover:bg-red-50 hover:text-red-600" onClick={handleUnknown}>
            <RotateCw className="h-4 w-4" />
            Повторить
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleKnown}>
            <Volume2 className="h-4 w-4" />
            Знаю
          </Button>
        </div>

        <Button variant="outline" size="icon" onClick={handleNext} disabled={isLast}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
