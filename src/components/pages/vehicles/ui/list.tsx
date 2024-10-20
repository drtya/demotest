'use client';
import {
  VehicleCard,
  VehicleCardFooter,
} from '@/components/shared/vehicles/ui/card';
import { getVehicles } from '@/lib/actions/vehicle';
import { useVehicleStore } from '@/store/vehicle';
import { useEffect } from 'react';
import useSWR from 'swr';

const daysLeft = (createDate: Date) => {
  const dateToMs = (date: Date) => {
    return new Date(date).valueOf();
  };
  const todayMs = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((todayMs - dateToMs(createDate)) / msInDay);
};

const VehiclesList = () => {  
  const {vehicles,setVehicleStore} = useVehicleStore()
  useEffect(()=>{
    setVehicleStore()
  },[])
  if (!vehicles.length) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-custom32">
      {vehicles.map((el) => {
        return (
          <VehicleCard
            settingsAction={() => {}}
            title={`${el.make} ${el.model}`}
            description={el.vin}
            image={el.image || '/mersedes.png'}
            footer={
              <VehicleCardFooter
                amount={el.amount}
                maxAmount={el.maxAmount}
                create={
                  daysLeft(el.createdAt!) >= 1
                    ? `${daysLeft(el.createdAt!)} days left`
                    : 'today'
                }
              />
            }
          />
        );
      })}
    </div>
  );
};

export default VehiclesList;
