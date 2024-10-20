'use server';
import { mutate } from 'swr';
import prisma from '../db';
import { IVehicle } from '../types/vehicle';
import { useVehicleStore } from '@/store/vehicle';

const createVehicle = async (formData: FormData) => {
  try {
    const createSlug = `${(formData.get('make') as string)
      .replace(/\s+/g, '-')
      .toLowerCase()}-${(formData.get('model') as string)
      .replace(/\s+/g, '-')
      .toLowerCase()}`;
    const vehicle = await prisma.vehicle.create({
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
    useVehicleStore
      .getState()
      .addVehicleStore(vehicle);
    mutate('/api/vehicles');
  } catch (error: any) {
    return 'Не удалось создать автомобиль';
  }
};

const getVehicles = async () => {
  try {
    const vehicle: IVehicle[] = await prisma.vehicle.findMany();
    return vehicle;
  } catch (error: any) {
    throw new Error('Не удалось получить список автомобилей');
  }
};

export { createVehicle, getVehicles };
