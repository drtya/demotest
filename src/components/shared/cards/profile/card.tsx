import { CameraIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import noImg from '@/../public/no-img.svg';

interface IVehicleCard extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  carsAmount?: number;
  userName?: string;
  htmlFor?: string;
}

const ProfileCard = React.forwardRef<HTMLDivElement, IVehicleCard>(
  ({ className, htmlFor, carsAmount, image, userName, ...props }, ref) => {
    return (
      <div
        className={`w-full rounded-lg pt-custom16 pb-custom16 pr-custom24 pl-custom24 flex items-center gap-custom24 border ${className}`}
        {...props}
        ref={ref}
      >
        <Image
          className="rounded-full object-cover w-20 h-20"
          width={82}
          height={82}
          alt="photo"
          src={image || noImg}
        />
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-size24 font-medium">{userName||'Your Name'}</p>
          <label htmlFor={htmlFor} className="flex items-center gap-custom10 text-size14 cursor-pointer">
            <CameraIcon width={16} height={16} /> Add photo
          </label>
        </div>
      </div>
    );
  }
);

export { ProfileCard };
