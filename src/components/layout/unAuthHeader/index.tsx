import LocaleSwitch from '@/components/shared/locale/localeSwitch'
import React from 'react'

type Props = {}

const UnAuthHeader = (props: Props) => {
  return (
    <header className='flex items-center justify-between z-50'>
        <div className='text-black md:text-white duration-200'>Demo Test</div>
        <LocaleSwitch/>
    </header>
  )
}

export default UnAuthHeader