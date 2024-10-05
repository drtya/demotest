import { Input } from '@/components/ui/input';
import React, { forwardRef } from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  fieldName: string;
  description?: string;
}

const FormField = forwardRef<HTMLInputElement, FieldProps>(
  ({ fieldName, required, description, ...props }, ref) => {
    return (
      <div className="flex flex-col justify-start gap-custom10">
        <label htmlFor={fieldName} className="text-black-45 text-size15 font-medium">
          {fieldName}{' '}
          {required ? <span className="text-primary">*</span> : null}
        </label>
        <Input {...props} ref={ref} id={fieldName}></Input>
        <div className='text-size14 text-black-80'>{description}</div>
      </div>
    );
  }
);

export default FormField;
