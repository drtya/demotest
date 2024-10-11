'use client';
import FormField from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import React, { ChangeEventHandler } from 'react';

const ChangePasswordForm = () => {
  const MInputs = useTranslations('ProfileInputs');
  const validateReplayPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    const form = e.target.closest('form');
    const newPass = form?.querySelector(
      'input[name="newPassword"]'
    ) as HTMLInputElement;
    const replayPass = form?.querySelector(
      'input[name="confirmPassword"]'
    ) as HTMLInputElement;
    if (newPass && replayPass) {
      if (newPass.value !== replayPass.value) {
        replayPass.setCustomValidity('Пароли не совпадают');
      } else {
        replayPass.setCustomValidity('');
      }
    }
  };
  return (
    <div className="flex flex-col gap-custom16 bg-card p-custom24 rounded-lg">
      <FormField
        name="oldPassword"
        required
        placeholder="******"
        fieldName={MInputs('oldPassword')}
      />
      <FormField
        name="newPassword"
        required
        placeholder="******"
        fieldName={MInputs('newPassword')}
      />
      <FormField
        name="confirmPassword"
        onChange={(e) => validateReplayPassword(e)}
        required
        placeholder="******"
        star
        fieldName={MInputs('replayPassword')}
      />
    </div>
  );
};

export default ChangePasswordForm;
