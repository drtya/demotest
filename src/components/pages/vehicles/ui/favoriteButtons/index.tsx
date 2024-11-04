import RemoveFavoriteButton from './remove';
import AddFavoriteButton from './add';

const FavoriteButton = ({
  isFavorite,
  vehicleUUID,
}: {
  isFavorite?: boolean;
  vehicleUUID: string;
}) => {
  return isFavorite ? (
    <RemoveFavoriteButton vehicleUUID={vehicleUUID} />
  ) : (
    <AddFavoriteButton vehicleUUID={vehicleUUID} />
  );
};

export default FavoriteButton;
