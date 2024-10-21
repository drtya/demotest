import prisma from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const vehicleCount: number = await prisma.vehicle.count();
    return new Response(JSON.stringify(vehicleCount), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch cars' }), {
      status: 500,
    });
  }
}