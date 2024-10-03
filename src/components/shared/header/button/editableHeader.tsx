'use client';
import { PencilIcon } from '@heroicons/react/24/outline';
import React, { HTMLAttributes, useState } from 'react';
import { HeaderDescription, HeaderTitle, IEditableHeadingProps } from '..';
import { Input, InputUnBorder } from '@/components/ui/input';
import { CheckIcon } from '@heroicons/react/24/solid';

const EditableHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  IEditableHeadingProps
>(({ text, ...props }) => {
  const [editText, setText] = useState(text);
  const [editable, setEditable] = useState(false);
  const clickOnEdit = () => {
    setEditable((prev) => !prev);
  };
  const selectedEdit = () => {
    setEditable((prev) => !prev);
  };
  const changeInput = (e: any) => {
    setText((prev) => (prev = e.target.value));
  };
  return editable ? (
    <div className="flex items-center justify-between gap-custom16">
      <InputUnBorder
        className="text-size32"
        value={editText}
        onChange={(e) => changeInput(e)}
      />
      <button className="menuIconSize" onClick={selectedEdit}>
        <CheckIcon />
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-between gap-custom16">
      <HeaderTitle text={editText} {...props} />
      <button className="menuIconSize" onClick={clickOnEdit}>
        <PencilIcon />
      </button>
    </div>
  );
});
const EditableHeaderDescription = React.forwardRef<
  HTMLHeadingElement,
  IEditableHeadingProps
>(({ text, ...props }) => {
  const [editText, setText] = useState(text);
  const [editable, setEditable] = useState(false);
  const clickOnEdit = () => {
    setEditable((prev) => !prev);
  };
  const selectedEdit = () => {
    setEditable((prev) => !prev);
  };
  const changeInput = (e: any) => {
    setText((prev) => (prev = e.target.value));
  };
  return editable ? (
    <div className="flex items-center justify-between gap-custom16">
      <InputUnBorder
        className="text-size16"
        value={editText}
        onChange={(e) => changeInput(e)}
      />
      <button className="menuIconSize" onClick={selectedEdit}>
        <CheckIcon />
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-between gap-custom16">
      <HeaderDescription text={editText} {...props} />
      <button className="menuIconSize" onClick={clickOnEdit}>
        <PencilIcon />
      </button>
    </div>
  );
});
export { EditableHeaderTitle, EditableHeaderDescription };
