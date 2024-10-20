import React, { useMemo } from 'react';

export interface CardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'amount' | 'position';
  amount?: number | null;
  position?: number | null;
  maxAmount?: number | null;
}

const CardInfo = React.forwardRef<HTMLDivElement, CardInfoProps>(
  ({ variant, amount, maxAmount, position,className, ...props }, ref) => {
    const variantStyle = useMemo(() => {      
      if (variant === 'amount') {
        if (amount && maxAmount && amount >= maxAmount) {
          return 'text-size15 bg-greenLight text-green font-bold';
        } else if (amount || (maxAmount && amount! < maxAmount)) {
          return 'text-size15 bg-grayLight text-black-80 font-bold';
        } else {
          return 'text-size12 bg-primary-20 text-black-60 font-medium';
        }
      } else if (variant === 'position') {
        return 'text-size12 bg-grayLight text-black-60 font-medium';
      }
    }, [variant, amount, maxAmount]);
    const renderData = useMemo(() => {
      if (amount && maxAmount && amount >= maxAmount) {
        return `${amount}/${maxAmount}`;
      } else if (amount && maxAmount && amount < maxAmount) {
        return `${amount}/${maxAmount}`;
      } else if (amount && !maxAmount) {
        return amount;
      } else if (!amount && maxAmount) {
        return `${amount || 0}/${maxAmount}`;
      } else if (variant === 'position') {
        return `Position ${position}`;
      } else {
        return '0';
      }
    }, [amount, maxAmount,position]);
    return (
      <div
        className={`px-3 rounded-md py-1 ${variantStyle} ${className}`}
        ref={ref}
        {...props}
      >
        {renderData}
      </div>
    );
  }
);

export { CardInfo };
