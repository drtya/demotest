'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import ChangePasswordForm from './changePassword';

type Props = {};

const EditProfileForm = (props: Props) => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const MInputs = useTranslations('ProfileInputs');
  const MActions = useTranslations('Actions');

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
      }}
      className="w-form-384 flex flex-col gap-custom16"
    >
      <FormField
        required
        placeholder="Your Name"
        star
        fieldName={MInputs('name')}
      />
      <FormField
        required
        placeholder="your-email@mail.com"
        type='email'
        star
        fieldName={MInputs('email')}
        description={MInputs('emailDescription')}
      />
      <button
        type="button"
        className="self-start text-size16 text-blue-400"
        onClick={() => {
          setChangePassword((prev) => !prev);
        }}
      >
        {changePassword ? MActions('cancel') : MInputs('changePassword')}
      </button>
      {changePassword ? <ChangePasswordForm /> : null}
      <FormField
        placeholder="+996555224422"
        pattern="^\+\d{12}$"
        errorMessage="Формат номера должен быть +996123456789"
        fieldName={MInputs('phone')}
      />
      <Button type="submit" variant="primary">
       {MActions("saveChange")}
      </Button>
    </form>
  );
};

export default EditProfileForm;
