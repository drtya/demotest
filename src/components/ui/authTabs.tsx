'use client';
import { useTranslations } from 'next-intl';
import React, { forwardRef, HTMLAttributes, useState } from 'react';

interface IAuthTabsProps extends HTMLAttributes<HTMLDivElement> {
  registerForm: JSX.Element;
  loginForm: JSX.Element;
  defaultValue?: 'login' | 'register';
}
const AuthTabs = forwardRef<HTMLDivElement, IAuthTabsProps>(
  ({ defaultValue, registerForm, loginForm, className, ...props }, ref) => {
    const t = useTranslations('Auth');
    const [currentTab, setCurrentTab] = useState(defaultValue || 'login');
    const toggleForm = () => {
      setCurrentTab((prev) => (prev === 'register' ? 'login' : 'register'));
    };
    return currentTab === 'login' ? (
      <div
        {...props}
        className={`flex flex-col gap-custom20 ${className}`}
        ref={ref}
      >
        <div className="max-w-form-384">{loginForm}</div>
        <p className="text-size16 flex items-center text-black-80 gap-custom10">
          {t('noAcc')}
          <button className="text-blue-600" onClick={toggleForm}>
            {t('signup')}
          </button>
        </p>
      </div>
    ) : (
      <div
        {...props}
        className={`flex flex-col gap-custom20 ${className}`}
        ref={ref}
      >
        <div className="w-register-form">{registerForm}</div>
        <p className="text-size16 flex items-center text-black-80 gap-custom10">
          {t('haveAcc')}
          <button className="text-blue-600" onClick={toggleForm}>
            {t('signin')}
          </button>
        </p>
      </div>
    );
  }
);

export default AuthTabs;
