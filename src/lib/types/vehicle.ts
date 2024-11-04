import { IUser } from './user';

export interface IVehicle {
  uuid: string;
  slug: string;
  vin: string;
  make: string;
  model: string;
  image: string | null;
  bodyType: string | null;
  fuelType: string | null;
  horsePower: number | null;
  description: string | null;
  updatedAt: Date | null;
  createdAt: Date | null;
  amount: number | null;
  maxAmount: number | null;
  authorId?: string | null;
  // author?: IProfile;
  isCreatedByUser?: boolean;
  favorites?: boolean;
}
