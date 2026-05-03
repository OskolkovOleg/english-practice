import { getRandomExercises } from '@/lib/data';
import { ExercisePlayer } from '@/components/exercise-player';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Shuffle } from 'lucide-react';

export default async function PracticePage() {
  const exercises = await getRandomExercises(15);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Практика</h1>
        <p className="text-muted-foreground max-w-2xl">
          Случайные задания из всех тем. Отличный способ закрепить материал и выявить слабые места.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Shuffle className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Смешанная практика</CardTitle>
              <CardDescription>{exercises.length} случайных заданий</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <ExercisePlayer exercises={exercises} />
    </div>
  );
}
