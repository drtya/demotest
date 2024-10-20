import { getVehicles } from '@/lib/actions/vehicle';
import { IVehicle } from '@/lib/types/vehicle';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface VehicleState {
  vehicles: IVehicle[];
  vehiclesCount: number;
  setVehicleStore: () => void;
  addVehicleStore: (vehicle: IVehicle) => void;
}

export const useVehicleStore = create<VehicleState>()(
  devtools(
    (set, get) => ({
      vehicles: [],
      vehiclesCount: 0,
      setVehicleStore: async () => {
        const vehicles =await getVehicles()
        set({
          vehicles: vehicles,
          vehiclesCount: vehicles.length,
        });
      },
      addVehicleStore: (newVehicle) => {
        const { vehicles } = get();
        set({ vehicles: [newVehicle].concat(vehicles) });
      },
    }),
    { name: 'Vehicles' }
  )
);
