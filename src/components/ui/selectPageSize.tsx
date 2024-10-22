'use client';
import { setPageSize } from '@/store/globalStore';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import * as Select from '@radix-ui/react-select';
import { useCallback } from 'react';

const items = ['6', '9', '12', '20'];
const SelectPageSize = () => {
  const defaultValue = useAppSelector(
    (store) => store.global.globalParams.pageSize
  );
  const dispatch = useAppDispatch();
  const onChange = useCallback((value: string) => {
    dispatch(setPageSize(value));
  }, []);
  return (
    <div className="relative w-auto">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label="pageSize"
          className={
            'rounded-sm text-size15 p-custom10 transition-colors hover:bg-slate-100 border outline-none'
          }
        >
          <Select.Icon className='flex items-center gap-2'>
            {defaultValue}
            <ChevronDownIcon className='w-4 h-4'/>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="z-30 w-full overflow-hidden rounded-sm bg-white py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={`items_in_page${item}`}
                  className="flex cursor-default items-center p-custom10 text-size16 data-[highlighted]:bg-slate-100"
                  value={item}
                >
                  <div className="mr-2 w-[1rem]">
                    {item === defaultValue && (
                      <CheckIcon className="h-5 w-5 text-black-60 " />
                    )}
                  </div>
                  <span className="text-slate-900">{item}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectPageSize;
