'use client';
import { useBurgerMenu } from '@/store/burger';

const BurgerButton = ({
  className,
  colorClass,
}: {
  className?: string;
  colorClass?: string;
}) => {
  const isOpen = useBurgerMenu((state) => state.isOpen);
  const toggleOpen = useBurgerMenu((state) => state.toggleOpen);
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
