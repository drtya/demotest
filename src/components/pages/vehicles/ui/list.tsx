'use client';
import {
  VehicleCard,
  VehicleCardFooter,
} from '@/components/shared/vehicles/ui/card';
import { IError } from '@/lib/types/errors';
import { useGetVehiclesQuery } from '@/services/vehicles';

const daysLeft = (createDate: Date) => {
  const dateToMs = (date: Date) => {
    return new Date(date).valueOf();
  };
  const todayMs = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((todayMs - dateToMs(createDate)) / msInDay);
};

const VehiclesList = () => {
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as IError).data.error}</div>;
  return (
    <div className="grid grid-cols-3 gap-custom32">
      {!vehicles?.length ? (
        <div>Список автомобилей пуст</div>
      ) : (
        vehicles?.map((el) => {
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
        })
      )}
    </div>
  );
};

export default VehiclesList;
