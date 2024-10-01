import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return <input className={`outline-none border p-input rounded-input text-size16 ${type==='password'?' tracking-[3px]':null} ${className}`} type={type} ref={ref} {...props} />;
  }
);

export {
    Input
}