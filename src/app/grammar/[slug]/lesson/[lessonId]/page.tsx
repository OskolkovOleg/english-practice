import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLessonById, getTopicBySlug } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, PenTool } from 'lucide-react';
import { ExercisePlayer } from '@/components/exercise-player';

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href={`/grammar/${slug}`}>
        <Button variant="ghost" size="sm" className="mb-6 -ml-2 gap-1 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Назад к урокам
        </Button>
      </Link>

      <div className="mb-8">
        <div className="text-sm text-muted-foreground mb-1">{topic.title}</div>
        <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
      </div>

      <Tabs defaultValue="theory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="theory" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Теория
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-2">
            <PenTool className="h-4 w-4" />
            Практика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theory">
          <Card>
            <CardContent className="pt-6">
              <div
                className="prose prose-slate max-w-none dark:prose-invert
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-p:leading-relaxed prose-li:marker:text-primary
                  prose-strong:text-foreground
                  prose-ul:space-y-1
                "
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
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
