import { CardInfo } from '@/components/ui/cardInfoplate';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useCallback } from 'react';
import FavoriteButton from './favoriteButtons';
import CarCreator from './myCarHover';

interface IVehicleCard extends React.HTMLAttributes<HTMLDivElement> {
  isFavorite?: boolean;
  isCreatedByUser?: boolean;
  image: string;
  settingsAction: Function;
  title?: string;
  description?: string;
  footer?: JSX.Element;
  position?: number;
  vehicleUUID: string;
}

const VehicleCard = React.forwardRef<HTMLDivElement, IVehicleCard>(
  (
    {
      vehicleUUID,
      isFavorite,
      isCreatedByUser,
      className,
      footer,
      settingsAction,
      position,
      image,
      title,
      description,
      ...props
    },
    ref
  ) => {
    const settingsHandler = useCallback(settingsAction, [settingsAction]);
    return (
      <div
        title={isCreatedByUser ? 'Это ваше объявление' : ''}
        className={`max-w-[360px] rounded-md bg-card p-custom20 relative flex flex-col gap-custom16 justify-between ${className}`}
        {...props}
        ref={ref}
      >
        <button
          onClick={() => settingsHandler()}
          className="menuIconSize absolute top-custom20 right-custom20"
        >
          <EllipsisHorizontalIcon />
        </button>
        {isCreatedByUser ? (
          <CarCreator />
        ) : (
          <FavoriteButton vehicleUUID={vehicleUUID} isFavorite={isFavorite} />
        )}
        {position && (
          <CardInfo
            variant="position"
            className="absolute top-custom20 left-custom20"
          >
            {position}
          </CardInfo>
        )}
        <div className="">
          <Image
            src={image}
            alt={title ?? 'vehicles'}
            width={300}
            height={200}
            className="w-full p-custom20"
          />
          {title && (
            <p className=" leading-tight font-bold text-size20 text-black">
              {title}
            </p>
          )}
          {description && (
            <p className=" leading-tight mt-custom10 font-medium text-size15 text-black-60">
              {description}
            </p>
          )}
        </div>
        {footer ?? null}
      </div>
    );
  }
);

interface IVehicleCardFooter extends React.HTMLAttributes<HTMLDivElement> {
  amount: number | null;
  maxAmount: number | null;
  create?: string;
}
const VehicleCardFooter = React.forwardRef<HTMLDivElement, IVehicleCardFooter>(
  ({ className, amount, maxAmount, create, ...props }, ref) => {
    return (
      <div
        className="w-full pt-custom16 border-t border-grayLight flex items-center justify-between"
        ref={ref}
        {...props}
      >
        <CardInfo variant="amount" amount={amount} maxAmount={maxAmount} />
        {create && <p className="text-size15 text-black-60 ">{create}</p>}
      </div>
    );
  }
);

export { VehicleCard, VehicleCardFooter };
