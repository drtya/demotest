'use client';
import { Input } from '@/components/ui/input';
import React, { forwardRef, useState } from 'react';
import { TextArea } from './textArea';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement|HTMLTextAreaElement> {
  star?: boolean;
  fieldName: string;
  description?: string;
  errorMessage?: string;
  textarea?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      name,
      fieldName,
      onChange,
      required,
      star,
      textarea,
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
        setError(errorMessage || validationMessage);
      } else {
        setError('');
      }
      if (onChange) {
        onChange(event);
      }
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
        {textarea ? (
          <TextArea
            required={required}
            onChange={onChange}
            name={name}
            {...props}
            id={fieldName}
          />
        ) : (
          <Input
            required={required}
            onChange={changeHandler}
            name={name}
            {...props}
            ref={ref}
            id={fieldName}
          />
        )}
        {description && (
          <div className="text-size14 text-black-80">{description}</div>
        )}
        {error ? <div className="text-size14 text-primary">{error}</div> : null}
      </div>
    );
  }
);

export default FormField;
