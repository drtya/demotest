'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import Link from 'next/link';
import { signIn } from '@/lib/actions/auth';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const LoginForm = () => {
  const MAuth = useTranslations('Auth');
  const MInputs = useTranslations('ProfileInputs');
  const [error, setError] = useState('');
  const signinHandler = async (formData: FormData) => {
    const res = await signIn(formData);
    if (res) {
      setError(res);
    } else {
      setError('');
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-size32 mb-custom16">{MAuth('title')}</h2>
      <h2 className="text-size20 mb-custom40">{MAuth('welcome')}</h2>
      <form action={signinHandler} className="space-y-custom32">
        <div className="flex flex-col gap-custom16">
          <FormField
            required
            type="email"
            pattern="^[a-zA-z0-9._]+@[a-zA-z0-9 -]+\.[a-z]{2,}$"
            errorMessage="Email введен неверно"
            name="email"
            fieldName={MInputs('email')}
            placeholder="name@domain.com"
          />
          <FormField
            required
            minLength={6}
            errorMessage="Пароль не должен быть менее 6 символов"
            name="password"
            fieldName={MInputs('password')}
            placeholder="******"
            type="password"
          />
        </div>
        {error && <div className="text-primary text-size15">{error}</div>}
        <Link className="inline-block text-pink " href="#">
          {MAuth('forgotPassword')}
        </Link>
        <div className="flex flex-col gap-custom24">
          <Button type="submit" variant="primary">
            {MAuth('signin')}
          </Button>
          <Button type="button" variant="secondary">
            {MAuth('support')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
