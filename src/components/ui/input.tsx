import { forwardRef } from 'react';

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      className={`outline-none border padding-input rounded-input text-size16 focus:border-black-60 duration-300 ${
        type === 'password' ? ' tracking-[3px]' : null
      } ${className}`}
      type={type}
      ref={ref}
      {...props}
    />
  );
});

const InputUnBorder = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      className={`outline-none border-b w-full py-1 focus:border-blue-300 duration-300 ${
        type === 'password' ? ' tracking-[3px]' : null
      } ${className}`}
      type={type}
      ref={ref}
      {...props}
    />
  );
});

export { Input, InputUnBorder };
