import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET /api/song?sample=true|false&id=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sample = searchParams.get('sample');
  const id = searchParams.get('id');

  if (id) {
    // Lấy bài hát theo id
    const song = await prisma.song.findUnique({
      where: { id },
    });
    if (!song) return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    return NextResponse.json(song);
  }

  // Lấy danh sách sample
  if (sample === 'true') {
    const songs = await prisma.song.findMany({
      where: { sample: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(songs);
  }

  // Mặc định: lấy tất cả bài hát
  const songs = await prisma.song.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(songs);
}

// POST /api/song (tạo mới bài hát)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, notes, sample, user } = body;
  const song = await prisma.song.create({
    data: { name, notes, sample: !!sample, user },
  });
  return NextResponse.json(song);
}
