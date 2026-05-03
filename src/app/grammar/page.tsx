import Link from 'next/link';
import { getTopics } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Clock, History, Rocket, Activity, Text, Key, GitBranch } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Clock,
  History,
  Rocket,
  Activity,
  Text,
  Key,
  GitBranch,
};

export default async function GrammarPage() {
  const topics = await getTopics();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Грамматика</h1>
        <p className="text-muted-foreground max-w-2xl">
          Выберите тему для изучения теории и выполнения упражнений. Каждая тема содержит 
          объяснения с примерами и практические задания.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const Icon = iconMap[topic.icon] || BookOpen;
          return (
            <Link key={topic.id} href={`/grammar/${topic.slug}`}>
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {topic._count.lessons} уроков
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {topic.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Перейти к теме
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
