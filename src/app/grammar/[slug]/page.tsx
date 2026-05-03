import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTopicBySlug } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/grammar">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2 gap-1 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Назад к темам
        </Button>
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{topic.title}</h1>
        <p className="text-muted-foreground text-lg">{topic.description}</p>
      </div>

      <div className="space-y-4">
        {topic.lessons.map((lesson, index) => (
          <Link key={lesson.id} href={`/grammar/${topic.slug}/lesson/${lesson.id}`}>
            <Card className="transition-all hover:shadow-md hover:-translate-y-0.5 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {lesson.title}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {lesson._count.exercises} заданий
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <CardDescription>
                    Нажмите, чтобы изучить теорию и выполнить упражнения
                  </CardDescription>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
