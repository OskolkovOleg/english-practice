import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET() {
  let stats = await prisma.userStats.findFirst();
  if (!stats) {
    stats = await prisma.userStats.create({ data: {} });
  }
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { xp } = body;

  let stats = await prisma.userStats.findFirst();
  if (!stats) {
    stats = await prisma.userStats.create({ data: {} });
  }

  const today = getToday();
  const last = stats.lastActivityDate;

  let newStreak = stats.streak;
  let newLongest = stats.longestStreak;

  if (last === today) {
    // already active today
  } else if (last) {
    const lastDate = new Date(last);
    const todayDate = new Date(today);
    const diffDays = (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  if (newStreak > newLongest) {
    newLongest = newStreak;
  }

  const newTotalXP = stats.totalXP + (xp ?? 0);
  const newLevel = Math.floor(newTotalXP / 100) + 1;

  const updated = await prisma.userStats.update({
    where: { id: stats.id },
    data: {
      streak: newStreak,
      longestStreak: newLongest,
      totalXP: newTotalXP,
      level: newLevel,
      lastActivityDate: today,
    },
  });

  return NextResponse.json(updated);
}
