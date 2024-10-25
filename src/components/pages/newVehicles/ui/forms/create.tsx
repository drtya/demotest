'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import { IError } from '@/lib/types/errors';
import { useAddVehicleMutation } from '@/services/vehicles';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

const CreateVehicleForm = () => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const refImage = useRef<HTMLInputElement>(null);
  const [addVehicle, { isLoading, error }] = useAddVehicleMutation();
  const MAction = useTranslations('Actions');
  const MInputName = useTranslations('VehicleInputs');
  const { push } = useRouter();
  const createHandler = async (formData: FormData) => {
    await addVehicle(formData);
    if (!error) push('/vehicles');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const onDragHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPreviewImage(URL.createObjectURL(file));
      if (refImage.current) refImage.current.files = e.dataTransfer.files;
    }
  };

  return (
    <form
      action={createHandler}
      className="flex flex-col gap-custom16 max-w-form-384"
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor="photoArea">
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDragHandler}>
            {refImage.current?.files?.[0] ? (
              <Image
                className="rounded-lg"
                src={previewImage}
                alt="car"
                width={400}
                height={300}
              />
            ) : (
              <div className="border rounded-lg w-full h-[300px] flex items-center justify-center flex-col gap-custom16 text-center p-custom20 cursor-pointer">
                <p>НАЖМИТЕ , ЧТО БЫ ЗАГРУЗИТЬ ФАЙЛЫ, ЛИБО ПЕРЕТАЩИТЕ СЮДА</p>
                <p>png, jpeg</p>
              </div>
            )}
          </div>
        </label>
        <p className="text-size14 text-black-60 ">Загружайте фото без заднего фона </p>
      </div>
      <input
        ref={refImage}
        onChange={handleFileChange}
        className="w-0 h-0 hidden opacity-0 -z-10 "
        type="file"
        name="image"
        id="photoArea"
        accept="image/*"
      />
      <FormField
        name="vin"
        fieldName={MInputName('VIN')}
        required
        star
        placeholder="WDB 1400321A333419"
      />
      <FormField
        name="make"
        fieldName={MInputName('make')}
        required
        star
        placeholder="Merceses-Benz"
      />
      <FormField
        name="model"
        fieldName={MInputName('model')}
        required
        star
        placeholder="C-Class"
      />
      <FormField
        name="bodyType"
        fieldName={MInputName('bodyType')}
        placeholder="Sedan"
      />
      <FormField
        name="fuelType"
        fieldName={MInputName('fuelType')}
        placeholder="Petrol"
      />
      <FormField
        name="horsePower"
        type="number"
        fieldName={MInputName('hp')}
        placeholder="255"
      />
      <FormField
        name="maxAmount"
        type="number"
        fieldName={MInputName('amount')}
        placeholder="20"
      />
      <FormField
        name="description"
        fieldName={MInputName('description')}
        textarea
        placeholder="Description"
      />
      {error && (
        <div className="text-size15 text-primary-80">
          {(error as IError).data.error || 'An unknown error occurred'}
        </div>
      )}
      <Button type="submit" variant="primary" disabled={isLoading}>
        {MAction('addVehicle')}
      </Button>
    </form>
  );
};

export default CreateVehicleForm;
