'use client';
import { useAddVehicleInCartMutation } from '@/services/cart';
import { useGetVehiclesQuery } from '@/services/vehicles';
import { useAppSelector } from '@/store/hooks';
import { StarIcon } from '@heroicons/react/24/solid';

const AddFavoriteButton = ({ vehicleUUID }: { vehicleUUID: string }) => {
  const { search, pageSize, currentPage } = useAppSelector(
    (store) => store.global.globalParams
  );

  const { refetch } = useGetVehiclesQuery({
    searchQuery: search,
    page: currentPage,
    pageSize,
  });
  const [addVehicle, { isLoading: addLoad, error: addError }] =
    useAddVehicleInCartMutation();

  const addToFavorites = async () => {
    await addVehicle(vehicleUUID).unwrap();
    refetch();
  };
  return (
    <button
      disabled={addLoad}
      className="text-gray-300 cursor-pointer disabled:cursor-wait disabled:text-blue-300"
      onClick={addToFavorites}
    >
      <StarIcon className="fill-current" width={24} height={24} />
    </button>
  );
};

export default AddFavoriteButton;
