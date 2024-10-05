import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import Link from 'next/link';
import { signIn } from '@/lib/actions/auth';
import { useTranslations } from 'next-intl';

const LoginForm = () => {
  const t = useTranslations('Auth');

  const signinHandler = async (formData: FormData) => {
    'use server';
    await signIn(formData);
  };

  return (
    <div className="w-full">
      <h2 className="text-size32 mb-custom16">{t('title')}</h2>
      <h2 className="text-size20 mb-custom40">{t('welcome')}</h2>
      <form action={signinHandler} className="space-y-custom32">
        <div>
          <FormField
            name="email"
            fieldName={t('email')}
            placeholder="name@domain.com"
          />
          <FormField
            name="password"
            fieldName={t('password')}
            placeholder="******"
            type="password"
          />
        </div>
        <Link className="inline-block text-pink " href="#">
          {t('forgotPassword')}
        </Link>
        <div className="flex flex-col gap-custom24">
          <Button type="submit" variant="primary">
            {t('signin')}
          </Button>
          <Button type="button" variant="secondary">
            {t('support')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
