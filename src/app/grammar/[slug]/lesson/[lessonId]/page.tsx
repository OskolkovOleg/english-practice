import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLessonById, getTopicBySlug, getLessonMarkdown } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, PenTool } from 'lucide-react';
import { ExercisePlayer } from '@/components/exercise-player';
import { MarkdownRenderer } from '@/components/markdown-renderer';

interface Props {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonId } = await params;
  const [topic, lesson] = await Promise.all([
    getTopicBySlug(slug),
    getLessonById(lessonId),
  ]);

  if (!topic || !lesson || lesson.topicId !== topic.id) return notFound();

  const markdown = getLessonMarkdown(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link href={`/grammar/${slug}`}>
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2 gap-1 text-[#777] hover:text-[#3f3f3f] text-base font-bold"
        >
          <ArrowLeft className="h-5 w-5" />
          Назад
        </Button>
      </Link>

      <div className="mb-8">
        <div className="text-lg font-bold text-[#58cc02] mb-1">{topic.title}</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#3f3f3f]">{lesson.title}</h1>
      </div>

      <Tabs defaultValue="theory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-sm h-16 rounded-xl bg-[#f7f9fc] p-1">
          <TabsTrigger
            value="theory"
            className="gap-2 text-lg font-extrabold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#58cc02]"
          >
            <BookOpen className="h-6 w-6" />
            Теория
          </TabsTrigger>
          <TabsTrigger
            value="practice"
            className="gap-2 text-lg font-extrabold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1cb0f6]"
          >
            <PenTool className="h-6 w-6" />
            Практика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theory">
          <Card className="border-2 border-[#e5e5e5] shadow-none">
            <CardContent className="pt-8 pb-8">
              {markdown ? (
                <MarkdownRenderer content={markdown} />
              ) : (
                <div className="text-lg text-[#777] font-bold">
                  Теория для этой темы пока не добавлена.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <ExercisePlayer exercises={lesson.exercises} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
