'use client';
import {
  useRemoveVehicleFromCartMutation,
} from '@/services/cart';
import { useGetVehiclesQuery } from '@/services/vehicles';
import { useAppSelector } from '@/store/hooks';
import { StarIcon } from '@heroicons/react/24/solid';

const RemoveFavoriteButton = ({ vehicleUUID }: { vehicleUUID: string }) => {
  const { search, pageSize, currentPage } = useAppSelector(
    (store) => store.global.globalParams
  );

  const { refetch } = useGetVehiclesQuery({
    searchQuery: search,
    page: currentPage,
    pageSize,
  });
  const [removeVehicle, { isLoading: removeLoad, error: removeError }] =
    useRemoveVehicleFromCartMutation();
  const removeFromFavorites = async () => {
    await removeVehicle(vehicleUUID).unwrap();
    refetch();
  };
  return (
    <button
      disabled={removeLoad}
      className="text-yellow-300 cursor-pointer disabled:cursor-wait disabled:text-blue-300"
      onClick={removeFromFavorites}
    >
      <StarIcon className="fill-current" width={24} height={24} />
    </button>
  );
};

export default RemoveFavoriteButton;
