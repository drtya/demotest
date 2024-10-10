import FormField from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import React from 'react';

const ChangePasswordForm = () => {
  const MInputs = useTranslations('ProfileInputs');
  return (
    <div className='flex flex-col gap-custom16 bg-card p-custom24 rounded-lg'>
      <FormField
        required
        placeholder="******"
        fieldName={MInputs('oldPassword')}
      />
      <FormField
        required
        placeholder="******"
        fieldName={MInputs('newPassword')}
      />
      <FormField
        required
        placeholder="******"
        star
        fieldName={MInputs('replayPassword')}
      />
    </div>
  );
};

export default ChangePasswordForm;
