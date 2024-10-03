import React, { useMemo } from 'react';

export interface CardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'amount' | 'position';
  amount?: number;
  maxAmount?: number;
}

const CardInfo = React.forwardRef<HTMLDivElement, CardInfoProps>(
  ({ variant, amount, maxAmount, className, ...props }, ref) => {
    const variantStyle = useMemo(() => {
      if (variant === 'amount') {
        if (amount && maxAmount && amount >= maxAmount) {
          return 'text-size15 bg-greenLight text-green font-bold';
        } else {
          return 'text-size15 bg-grayLight text-black-80 font-bold';
        }
      } else {
        return 'text-size12 bg-grayLight text-black-60 font-medium';
      }
    }, [variant, amount]);
    return (
      <div
        className={`px-3 rounded-md py-1 ${variantStyle}`}
        ref={ref}
        {...props}
      ></div>
    );
  }
);

export { CardInfo };
