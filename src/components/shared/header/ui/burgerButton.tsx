'use client';
import { toggleBurgerMenu } from '@/store/globalStore';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const BurgerButton = ({
  className,
  colorClass,
}: {
  className?: string;
  colorClass?: string;
}) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((store) => store.global.burger);
  const toggleOpen = () => {
    dispatch(toggleBurgerMenu());
  };
  return (
    <button
      className={`menuIconSize relative overflow-hidden block ${className}`}
      onClick={toggleOpen}
    >
      <div
        className={`duration-300 w-full h-[2px] ${
          colorClass ?? 'bg-black'
        } absolute top-0 ${isOpen && '-rotate-45 !top-1/2 !-translate-y-1/2'}`}
      ></div>
      <div
        className={`duration-300 w-full h-[2px] ${
          colorClass ?? 'bg-black'
        } absolute top-1/2 -translate-y-1/2 ${
          isOpen && 'opacity-0 -translate-x-full'
        }`}
      ></div>
      <div
        className={`duration-300 w-full h-[2px] ${
          colorClass ?? 'bg-black'
        } absolute top-full -translate-y-full ${
          isOpen && 'rotate-45 !top-1/2 !-translate-y-1/2'
        }`}
      ></div>
    </button>
  );
};

export default BurgerButton;
