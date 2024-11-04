'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Input } from './input';
import { setSearch } from '@/store/globalStore';
import { useEffect } from 'react';

const SearchInput = () => {
  const search = useAppSelector((store) => store.global.globalParams.search);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearch(''));
    };
  }, []);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return <Input onChange={changeHandler} value={search} placeholder="Search" />;
};

export default SearchInput;
