'use client'
import LocaleSwitcherSelect from './localeSwotchSelect';
import { useLocale } from 'next-intl';
import eng from '@/assets/images/lang/eng.svg';
import rus from '@/assets/images/lang/rus.svg';
import chevronDown from '@/assets/images/lang/chevronDown.svg';
import Image from 'next/image';
import { memo } from 'react';

export default memo(function LocaleSwitch() {
  const locale = useLocale();
  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label="label"
      items={[
        {
          value: 'en',
          label: 'English',
          visibleTag: (
            <div className="flex items-center gap-1 h-10">
              <Image
                src={eng}
                alt="en"
                width={36}
                height={36}
                className="rounded-full w-8 h-8 object-cover"
              />
              En
              <Image src={chevronDown} alt="down" width={14} height={14} />
            </div>
          ),
        },
        {
          value: 'ru',
          label: 'Russian',
          visibleTag: (
            <div className="flex items-center gap-1 h-10">
              <Image
                src={rus}
                alt="en"
                width={36}
                height={36}
                className="rounded-full w-8 h-8 object-cover"
              />
              Ru
              <Image src={chevronDown} alt="down" width={14} height={14} />
            </div>
          ),
        },
      ]}
    />
  );
});
