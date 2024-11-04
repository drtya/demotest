'use client';
import Pagination from '@/components/ui/pagination';
import { IError } from '@/lib/types/errors';
import { useAppSelector } from '@/store/hooks';
import { MyVehicleCard, MyVehicleCardFooter } from './card';
import { useGetVehiclesInCartQuery } from '@/services/cart';

const daysLeft = (createDate: Date) => {
  const dateToMs = (date: Date) => {
    return new Date(date).valueOf();
  };
  const todayMs = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((todayMs - dateToMs(createDate)) / msInDay);
};

const FavoritesList = () => {
  const { search, pageSize, currentPage } = useAppSelector(
    (store) => store.global.globalParams
  );

  const { data, error, isLoading } = useGetVehiclesInCartQuery({
    searchQuery: search,
    page: currentPage,
    pageSize,
  });
  console.log(JSON.stringify(data?.vehicles));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as IError).data.error}</div>;
  return (
    <div>
      {!data?.vehicles?.length ? (
        <div>Список избранных автомобилей пуст</div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-custom32">
            {data?.vehicles?.map((el) => {
              return (
                <MyVehicleCard
                  vehicleUUID={el.uuid}
                  settingsAction={() => {}}
                  title={`${el.make} ${el.model}`}
                  description={el.vin}
                  image={el.image || '/no-car-img.png'}
                  footer={
                    <MyVehicleCardFooter
                      create={
                        daysLeft(el.createdAt!) >= 1
                          ? `Created ${daysLeft(el.createdAt!)} days left`
                          : 'Created today'
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

export default FavoritesList;
