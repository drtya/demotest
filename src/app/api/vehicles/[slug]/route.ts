import prisma from '@/lib/db';
import { NextRequest } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const formData = await request.formData();
  const createSlug = `${(formData.get('make') as string)
    .replace(/\s+/g, '-')
    .toLowerCase()}-${(formData.get('model') as string)
    .replace(/\s+/g, '-')
    .toLowerCase()}`;

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: {
        slug: slug,
      },
      data: {
        vin: formData.get('vin') as string,
        slug: createSlug,
        make: formData.get('make') as string,
        model: formData.get('model') as string,
        bodyType: (formData.get('bodyType') as string) ?? null,
        fuelType: (formData.get('fuelType') as string) ?? null,
        maxAmount: Number(formData.get('maxAmount') as string) ?? null,
        horsePower: Number(formData.get('horsePower') as string) ?? null,
        description: (formData.get('description') as string) ?? null,
      },
    });

    return new Response(JSON.stringify(updatedVehicle), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update car' }), {
      status: 500,
    });
  }
}
