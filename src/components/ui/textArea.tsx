import React from 'react';

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.InputHTMLAttributes<HTMLTextAreaElement>
>(({ className, type, ...props }, ref) => {
  return (
    <textarea
      className={`outline-none border padding-input rounded-input text-size16 focus:border-black-60 duration-300 max-h-20 min-h-20 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

export { TextArea };
