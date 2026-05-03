import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const progress = await prisma.userProgress.findMany();
  return NextResponse.json(progress);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, entityId, completed, score } = body;

  if (!type || !entityId) {
    return NextResponse.json({ error: 'Missing type or entityId' }, { status: 400 });
  }

  const existing = await prisma.userProgress.findUnique({
    where: { type_entityId: { type, entityId } },
  });

  if (existing) {
    const updated = await prisma.userProgress.update({
      where: { id: existing.id },
      data: {
        completed: completed ?? existing.completed,
        score: Math.max(existing.score, score ?? 0),
        attempts: existing.attempts + 1,
      },
    });
    return NextResponse.json(updated);
  }

  const created = await prisma.userProgress.create({
    data: {
      type,
      entityId,
      completed: completed ?? false,
      score: score ?? 0,
      attempts: 1,
    },
  });

  return NextResponse.json(created);
}
