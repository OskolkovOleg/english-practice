import { prisma } from './prisma';
import fs from 'fs';
import path from 'path';

export async function getTopics() {
  return prisma.topic.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { lessons: true },
      },
    },
  });
}

export async function getTopicBySlug(slug: string) {
  return prisma.topic.findUnique({
    where: { slug },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: { exercises: true },
          },
        },
      },
    },
  });
}

export async function getLessonById(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      topic: true,
      exercises: {
        orderBy: { difficulty: 'asc' },
      },
    },
  });
}

export async function getWords(options?: { category?: string; limit?: number; random?: boolean }) {
  const where = options?.category ? { category: options.category } : {};
  
  if (options?.random) {
    const words = await prisma.word.findMany({ where });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return options.limit ? shuffled.slice(0, options.limit) : shuffled;
  }
  
  return prisma.word.findMany({
    where,
    take: options?.limit,
    orderBy: { difficulty: 'asc' },
  });
}

export async function getWordCategories() {
  const result = await prisma.word.groupBy({
    by: ['category'],
    _count: { category: true },
  });
  return result.map((r) => ({ category: r.category, count: r._count.category }));
}

export async function getRandomExercises(limit = 10) {
  const exercises = await prisma.exercise.findMany({
    include: {
      lesson: {
        include: {
          topic: true,
        },
      },
    },
  });
  return exercises.sort(() => Math.random() - 0.5).slice(0, limit);
}

export async function getExerciseStats() {
  const totalExercises = await prisma.exercise.count();
  const totalWords = await prisma.word.count();
  const totalTopics = await prisma.topic.count();
  
  return { totalExercises, totalWords, totalTopics };
}

export function getLessonMarkdown(slug: string): string {
  const filePath = path.join(process.cwd(), 'content', 'grammar', `${slug}.md`);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return '';
}

export async function getUserStats() {
  let stats = await prisma.userStats.findFirst();
  if (!stats) {
    stats = await prisma.userStats.create({ data: {} });
  }
  return stats;
}

export async function getProgressSummary() {
  const [exerciseProgress, wordProgress, stats, totalExercises, totalWords] = await Promise.all([
    prisma.userProgress.count({ where: { type: 'exercise', completed: true } }),
    prisma.userProgress.count({ where: { type: 'word', completed: true } }),
    getUserStats(),
    prisma.exercise.count(),
    prisma.word.count(),
  ]);

  return {
    exerciseProgress,
    wordProgress,
    totalExercises,
    totalWords,
    stats,
  };
}
