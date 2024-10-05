import FormField from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { register } from '@/lib/actions/auth';

const RegisterForm = () => {
  const t = useTranslations('Auth');
  const signinHandler = async (formData: FormData) => {
    'use server';
    const user = await register(formData);
  };
  return (
    <div className="w-full">
      <h2 className="text-size32 mb-custom16">{t('title')}</h2>
      <form action={signinHandler} className="space-y-custom32">
        <div>
          <div className="flex items-center gap-custom10 w-full *:w-full">
            <FormField
              name="email"
              fieldName={t('email')}
              placeholder="name@domain.com"
            />
            <FormField
              name="login"
              fieldName={t('login')}
              placeholder="yourLogin27"
            />
          </div>
          <FormField
            name="fullName"
            fieldName={t('name')}
            placeholder="Your Name"
          />
          <FormField
            name="password"
            fieldName={t('password')}
            placeholder="******"
            type="password"
          />
        </div>
        <div className="flex flex-col gap-custom24">
          <Button type="submit" variant="primary">
            {t('signup')}
          </Button>
          <Button type="button" variant="secondary">
            {t('support')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
