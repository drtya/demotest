import { CardInfo } from '@/components/ui/cardInfoplate';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useCallback } from 'react';
import RemoveFavoriteButton from '../../vehicles/ui/favoriteButtons/remove';

interface IVehicleCard extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  settingsAction: Function;
  title?: string;
  description?: string;
  footer?: JSX.Element;
  vehicleUUID: string;
}

const MyVehicleCard = React.forwardRef<HTMLDivElement, IVehicleCard>(
  (
    {
      vehicleUUID,
      className,
      footer,
      settingsAction,
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
        title={'Это ваше объявление'}
        className={`max-w-[360px] rounded-md bg-card p-custom20 relative flex flex-col gap-custom16 justify-between ${className}`}
        {...props}
        ref={ref}
      >
        <div className="menuIconSize absolute top-custom20 right-custom20">
          <RemoveFavoriteButton vehicleUUID={vehicleUUID} />
        </div>
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
  create?: string;
}
const MyVehicleCardFooter = React.forwardRef<
  HTMLDivElement,
  IVehicleCardFooter
>(({ className, create, ...props }, ref) => {
  return (
    <div
      className={`w-full pt-custom16 border-t border-grayLight flex items-center justify-between ${className}`}
      ref={ref}
      {...props}
    ></div>
  );
});

export { MyVehicleCard, MyVehicleCardFooter };
