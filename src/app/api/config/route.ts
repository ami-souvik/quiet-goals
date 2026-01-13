import { NextResponse } from 'next/server';
import { MOODS } from '@/lib/moods';
import { VARIANTS } from '@/lib/variants';

export async function GET() {
  return NextResponse.json({
    moods: MOODS,
    variants: VARIANTS
  });
}
