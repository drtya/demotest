'use client';
import FormField from '@/components/shared/field/field';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/config';

const RegisterForm = () => {
  const t = useTranslations('Auth');
  const { replace } = useRouter();
  const signinHandler = (e: any) => {
    e.preventDefault();
    replace('/profile');
  };
  return (
    <div className="w-full">
      <h2 className="text-size32 mb-custom16">{t('title')}</h2>
      <form className="space-y-custom32">
        <div>
          <div className="flex items-center gap-custom10 w-full *:w-full">
            <FormField fieldName={t('email')} placeholder="name@domain.com" />
            <FormField fieldName={t('login')} placeholder="yourLogin27" />
          </div>
          <FormField fieldName={t('name')} placeholder="name@domain.com" />
          <FormField
            fieldName={t('password')}
            placeholder="******"
            type="password"
          />
        </div>
        <div className="flex flex-col gap-custom24">
          <Button variant="primary" onClick={signinHandler}>
            {t('signup')}
          </Button>
          <Button variant="secondary">{t('support')}</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
