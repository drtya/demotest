import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'settings';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const variantStyle = (variant: string | undefined) => {
      switch (variant) {
        case 'primary':
          return 'bg-primary text-white hover:bg-primary-80';
        case 'secondary':
          return 'border-secondaryButton border-pink text-pink hover:bg-pink-20';
        default:
          return 'border hover:bg-black-10';
      }
    };
    return (
      <button
        className={`p-button uppercase rounded-button outline-none text-size14 duration-300 ${variantStyle(
          variant
        )}`}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button };
