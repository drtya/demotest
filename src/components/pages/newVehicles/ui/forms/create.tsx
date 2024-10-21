'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import { createVehicle } from '@/lib/actions/vehicle';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const CreateVehicleForm = () => {
  const MAction = useTranslations('Actions')
  const MInputName = useTranslations('VehicleInputs')
  const { push } = useRouter();
  const createHandler = async (formData: FormData) => {
    await createVehicle(formData);
    push('/vehicles');
  };
  return (
    <form
      action={createHandler}
      className="flex flex-col gap-custom16 max-w-form-384"
    >
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
      <FormField name="bodyType" fieldName={MInputName('bodyType')} placeholder="Sedan" />
      <FormField name="fuelType" fieldName={MInputName('fuelType')} placeholder="Petrol" />
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
      <Button type="submit" variant="primary">
        {MAction('addVehicle')}
      </Button>
    </form>
  );
};

export default CreateVehicleForm;
