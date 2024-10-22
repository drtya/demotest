'use client';
import {
  VehicleCard,
  VehicleCardFooter,
} from '@/components/shared/vehicles/ui/card';
import Pagination from '@/components/ui/pagination';
import { IError } from '@/lib/types/errors';
import { useGetVehiclesQuery } from '@/services/vehicles';
import { useAppSelector } from '@/store/hooks';

const daysLeft = (createDate: Date) => {
  const dateToMs = (date: Date) => {
    return new Date(date).valueOf();
  };
  const todayMs = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((todayMs - dateToMs(createDate)) / msInDay);
};

const VehiclesList = () => {
  const { search, pageSize, currentPage } = useAppSelector(
    (store) => store.global.globalParams
  );

  const { data, error, isLoading } = useGetVehiclesQuery({
    searchQuery: search,
    page: currentPage,
    pageSize,
  });

  console.log(data?.vehicle);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as IError).data.error}</div>;
  return (
    <div>
      {!data?.vehicle?.length ? (
        <div>Список автомобилей пуст</div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-custom32">
            {data?.vehicle?.map((el) => {
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
          <Pagination
            className="mt-custom24"
            totalPages={String(data.totalPages)}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default VehiclesList;
