'use client';
import { Input } from '@/components/ui/input';
import React, { forwardRef, useCallback, useState } from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  star?: boolean;
  fieldName: string;
  description?: string;
  errorMessage?: string;
}

const FormField = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      fieldName,
      onChange,
      required,
      star,
      description,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [error, setError] = useState('');
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      const input = event.target;
      const validationMessage = input.validationMessage;
      if (validationMessage) {
        setError(errorMessage||validationMessage);
      } else {
        setError('');
      }
      onChange;
    };
    return (
      <div className="flex flex-col justify-start gap-custom10">
        <label
          htmlFor={fieldName}
          className={`text-black-45 text-size15 font-medium ${
            error ? 'text-primary' : 'text-black-45'
          }`}
        >
          {fieldName} {star ? <span className="text-primary">*</span> : null}
        </label>
        <Input
          required={required}
          onChange={changeHandler}
          {...props}
          ref={ref}
          id={fieldName}
        ></Input>
        {description && (
          <div className="text-size14 text-black-80">{description}</div>
        )}
        {error ? <div className="text-size14 text-primary">{error}</div>:null}
      </div>
    );
  }
);

export default FormField;
