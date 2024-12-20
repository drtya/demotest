'use client';
import { UserDetailContext } from '@/app/_context/userDetailContext';
import Pagination from '@/components/ui/pagination';
import { IError } from '@/lib/types/errors';
import { useAppSelector } from '@/store/hooks';
import { useContext } from 'react';
import { MyVehicleCard, MyVehicleCardFooter } from './card';
import { useGetProfileVehiclesQuery } from '@/services/vehicles';

const daysLeft = (createDate: Date) => {
  const dateToMs = (date: Date) => {
    return new Date(date).valueOf();
  };
  const todayMs = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((todayMs - dateToMs(createDate)) / msInDay);
};

const MyVehiclesList
 = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const { search, pageSize, currentPage } = useAppSelector(
    (store) => store.global.globalParams
  );

  const { data, error, isLoading } = useGetProfileVehiclesQuery({
    searchQuery: search,
    page: currentPage,
    pageSize,
    id: userDetail?.uuid as string,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as IError).data.error}</div>;
  return (
    <div>
      {!data?.vehiclesWithOwnershipFlag?.length ? (
        <div>Список избранных автомобилей пуст</div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-custom32">
            {data?.vehiclesWithOwnershipFlag?.map((el) => {
              return (
                <MyVehicleCard
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

export default MyVehiclesList
;
