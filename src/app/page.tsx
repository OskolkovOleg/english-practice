import Link from 'next/link';
import { BookOpen, Brain, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getExerciseStats } from '@/lib/data';
import { HomeHero } from '@/components/home-hero';

export default async function HomePage() {
  const stats = await getExerciseStats();

  const features = [
    {
      icon: BookOpen,
      title: 'Грамматика',
      description: 'Изучайте теорию по темам: времена, артикли, модальные глаголы и условные предложения.',
      href: '/grammar',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: Brain,
      title: 'Практика',
      description: 'Решайте упражнения на перевод, заполнение пропусков и тесты с объяснениями.',
      href: '/practice',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: Layers,
      title: 'Слова',
      description: 'Учите слова с помощью интерактивных карточек, транскрипций и примеров.',
      href: '/words',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      iconBg: 'bg-amber-100',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <HomeHero
        totalTopics={stats.totalTopics}
        totalExercises={stats.totalExercises}
        totalWords={stats.totalWords}
      />

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div key={feature.href}>
            <Link href={feature.href}>
              <Card className={`h-full transition-all hover:shadow-lg hover:-translate-y-1 ${feature.color}`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-3`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
