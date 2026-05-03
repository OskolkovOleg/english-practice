import { getRandomExercises } from '@/lib/data';
import { ExercisePlayer } from '@/components/exercise-player';

export default async function PracticePage() {
  const exercises = await getRandomExercises(15);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#3f3f3f] mb-2 text-center">
        Практика
      </h1>
      <p className="text-lg text-[#777] font-bold text-center mb-10">
        Случайные задания из всех тем
      </p>

      <ExercisePlayer exercises={exercises} />
    </div>
  );
}
