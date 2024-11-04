'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ChangePasswordForm from './changePassword';
import { useUpdateProfileMutation } from '@/services/profile';
import { IError } from '@/lib/types/errors';
import { ProfileCard } from '@/components/shared/cards/profile/card';
import { UserDetailContext } from '@/app/_context/userDetailContext';

const EditProfileForm = () => {
  const refImage: any = useRef(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const MInputs = useTranslations('ProfileInputs');
  const MActions = useTranslations('Actions');

  useEffect(() => {
    if (userDetail?.photo) {
      setPreviewImage(userDetail?.photo);
    }
  }, [userDetail]);

  console.log(previewImage);

  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const editProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    if (refImage.current?.files?.[0]) {
      formData.append('photo', refImage.current.files[0]); // Добавляем изображение
    }

    updateProfile(formData);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handelClick = () => {
    setPreviewImage((prev) => prev && '');
  };
  return (
    <>
      <ProfileCard
        userName={userDetail?.fullName}
        htmlFor="profileImg"
        image={previewImage}
        className="mb-custom32"
      />
      <form
        onSubmit={editProfileHandler}
        className="max-w-form-384 flex flex-col gap-custom16"
      >
        <input
          ref={refImage}
          onClick={handelClick}
          onChange={handleFileChange}
          className="w-0 h-0 hidden opacity-0 -z-10 "
          type="file"
          name="photo"
          id="profileImg"
          accept="image/*"
        />
        <FormField
          required
          name="fullName"
          placeholder="Your Name"
          star
          fieldName={MInputs('name')}
        />
        <FormField
          name="email"
          required
          placeholder="your-email@mail.com"
          type="email"
          star
          fieldName={MInputs('email')}
          description={MInputs('emailDescription')}
        />
        <button
          type="button"
          className="self-start text-size16 text-blue-400"
          onClick={() => {
            setChangePassword((prev) => !prev);
          }}
        >
          {changePassword ? MActions('cancel') : MInputs('changePassword')}
        </button>
        {changePassword ? <ChangePasswordForm /> : null}
        <FormField
          name="phone"
          placeholder="+996555224422"
          pattern="^\+\d{12}$"
          errorMessage="Формат номера должен быть +996123456789"
          fieldName={MInputs('phone')}
        />
        {error && (
          <div className="text-size15 text-primary-80">
            {(error as IError).data.error || 'An unknown error occurred'}
          </div>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {MActions('saveChange')}
        </Button>
      </form>
    </>
  );
};

export default EditProfileForm;
