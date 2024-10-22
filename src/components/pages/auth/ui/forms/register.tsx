'use client';
import FormField from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRegisterMutation } from '@/services/profile';
import { useRouter } from 'next/navigation';
import { IError } from '@/lib/types/errors';

const RegisterForm = () => {
  const { push } = useRouter();
  const MAuth = useTranslations('Auth');
  const MInputs = useTranslations('ProfileInputs');
  const [register, { isLoading, error }] = useRegisterMutation();
  const signupHandler = async (formData: FormData) => {
    await register(formData);
    if (!error) push('/profile');
  };
  return (
    <div className="w-full">
      <h2 className="text-size32 mb-custom16">{MAuth('title')}</h2>
      <form action={signupHandler} className="space-y-custom32">
        <div className="flex flex-col gap-custom16">
          <FormField
            required
            type="email"
            name="email"
            fieldName={MInputs('email')}
            placeholder="name@domain.com"
          />
          <FormField
            required
            name="fullName"
            fieldName={MInputs('name')}
            placeholder="Your Name"
          />
          <FormField
            required
            pattern="[a-zA-z0-9]{6,}"
            errorMessage="Пароль не должен быть менее 6 символов"
            name="password"
            fieldName={MInputs('password')}
            placeholder="******"
            type="password"
          />
        </div>
        {error && (
          <div className="text-primary text-size15">
            {(error as IError).data.error}
          </div>
        )}
        <div className="flex flex-col gap-custom24">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {MAuth('signup')}
          </Button>
          <Button type="button" variant="secondary">
            {MAuth('support')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
