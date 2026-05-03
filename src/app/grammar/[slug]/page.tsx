import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTopicBySlug } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link href="/grammar">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2 gap-1 text-[#777] hover:text-[#3f3f3f] text-base font-bold">
          <ArrowLeft className="h-5 w-5" />
          Назад
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3f3f3f] mb-2">{topic.title}</h1>
        <p className="text-lg text-[#777] font-bold">{topic.description}</p>
      </div>

      <div className="space-y-3">
        {topic.lessons.map((lesson, index) => (
          <Link key={lesson.id} href={`/grammar/${topic.slug}/lesson/${lesson.id}`}>
            <div className="flex items-center gap-4 rounded-2xl border-2 border-[#e5e5e5] bg-white p-5 transition-all hover:border-[#1cb0f6] hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1cb0f6] text-white text-lg font-extrabold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl font-extrabold text-[#3f3f3f]">{lesson.title}</div>
                <div className="text-base font-bold text-[#777] mt-0.5">
                  {lesson._count.exercises} заданий
                </div>
              </div>
              <div className="rounded-lg px-3 py-1 text-sm font-bold bg-[#1cb0f6]/10 text-[#1cb0f6]">
                Начать
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
