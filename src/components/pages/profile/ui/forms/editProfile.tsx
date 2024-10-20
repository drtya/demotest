'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import React, { memo, useState } from 'react';
import ChangePasswordForm from './changePassword';
import { editProfile } from '@/lib/actions/auth';


const EditProfileForm = memo(() => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const MInputs = useTranslations('ProfileInputs');
  const MActions = useTranslations('Actions');
  const editProfileHandler =async(formData:FormData)=>{
    await editProfile(formData)
  }
  return (
    <form
      action={editProfileHandler}
      className="max-w-form-384 flex flex-col gap-custom16"
    >
      <FormField
        required
        name='fullName'
        placeholder="Your Name"
        star
        fieldName={MInputs('name')}
      />
      <FormField
      name='email'
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
      name='phone'
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
})

export default EditProfileForm;
