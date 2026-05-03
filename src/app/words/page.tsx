import { getWords, getWordCategories } from '@/lib/data';
import { FlashcardDeck } from '@/components/flashcard-deck';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Layers } from 'lucide-react';

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function WordsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [words, categories] = await Promise.all([
    getWords({ category, random: true, limit: 30 }),
    getWordCategories(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Слова</h1>
        <p className="text-muted-foreground max-w-2xl">
          Изучайте слова через интерактивные карточки. Переворачивайте карточки, читайте примеры 
          и отмечайте изученные слова.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Флешкарды</CardTitle>
              <CardDescription>{words.length} слов в сессии</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <FlashcardDeck words={words} />
    </div>
  );
}
