import { getWords } from '@/lib/data';
import { FlashcardDeck } from '@/components/flashcard-deck';

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function WordsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const words = await getWords({ category, random: true, limit: 30 });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#3f3f3f] mb-2 text-center">
        Слова
      </h1>
      <p className="text-lg text-[#777] font-bold text-center mb-10">
        Переворачивай карточки и учи
      </p>

      <FlashcardDeck words={words} />
    </div>
  );
}
