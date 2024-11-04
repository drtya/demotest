import { createContext } from 'react';
import { IUser } from '@/lib/types/user';

interface IUserDetailContent {
  userDetail: IUser | null;
  setUserDetail: (user: IUser | null) => void;
}

export const UserDetailContext = createContext<IUserDetailContent>({
  userDetail: null,
  setUserDetail: () => {},
});
