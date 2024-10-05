import UnAuthHeader from '@/components/layout/unAuthHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import car from '@/assets/images/auth/car.png';
import LoginForm from './forms/login';
import AuthTabs from '@/components/ui/authTabs';
import RegisterForm from './forms/register';

const AuthPage = () => {
  const t = useTranslations('Auth');
  return (
    <div className="overflow-hidden relative w-screen h-screen bg-gradient">
      <div className="fixed left-1/2 -translate-x-1/2 container px-3 z-10">
        <UnAuthHeader />
      </div>
      <div className="flex items-center h-full">
        <div className="hidden xl:flex xl:flex-col xl:items-center xl:w-2/5 px-3 gap-6">
          <Image width={577} height={292} src={car} alt="car" />
          <p className="text-white-60 text-size24">{t('slogan')}</p>
        </div>
        <div className="duration-200 w-full md:w-4/5 ml-auto xl:w-3/5 xl:h-[120%] h-[110%] rounded-none md:rounded-s-full right-0 bg-white flex items-center justify-center">
          <AuthTabs loginForm={<LoginForm />} registerForm={<RegisterForm/>}/>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
