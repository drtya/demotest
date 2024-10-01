'use client';
import FormField from '@/components/shared/field/field';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from '@/i18n/config';

const LoginForm = () => {
  const t = useTranslations('Auth');
  const { replace } = useRouter();
  const signinHandler = (e:any) => {
    e.preventDefault()
    replace('/profile');
  };
  return (
    <div className="w-register-form">
      <h2 className="text-size32 mb-custom16">{t('title')}</h2>
      <h2 className="text-size20 mb-custom40">{t('welcome')}</h2>
      <form className="space-y-custom32">
        <div>
          <FormField fieldName={t('email')} placeholder="name@domain.com" />
          <FormField
            fieldName={t('password')}
            placeholder="******"
            type="password"
          />
        </div>
        <Link className="inline-block text-pink " href="#">
          {t('forgotPassword')}
        </Link>
        <div className="flex flex-col gap-custom24">
          <Button variant="primary" onClick={signinHandler}>
            {t('signin')}
          </Button>
          <Button variant="secondary">{t('support')}</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
