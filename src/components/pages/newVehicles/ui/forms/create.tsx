'use client';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/field';
import { createVehicle } from '@/lib/actions/vehicle';
import { useRouter } from 'next/navigation';

const CreateVehicleForm = () => {
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
        fieldName="VIN"
        required
        star
        placeholder="WDB 1400321A333419"
      />
      <FormField
        name="make"
        fieldName="Make"
        required
        star
        placeholder="Merceses-Benz"
      />
      <FormField
        name="model"
        fieldName="Model"
        required
        star
        placeholder="C-Class"
      />
      <FormField name="bodyType" fieldName="Body type" placeholder="Sedan" />
      <FormField name="fuelType" fieldName="Fuel type" placeholder="Petrol" />
      <FormField
        name="horsePower"
        type="number"
        fieldName="Horse power"
        placeholder="255"
      />
      <FormField
        name="maxAmount"
        type="number"
        fieldName="amount"
        placeholder="20"
      />
      <FormField
        name="description"
        fieldName="Description"
        textarea
        placeholder="Description"
      />
      <Button type="submit" variant="primary">
        Add Vehicle
      </Button>
    </form>
  );
};

export default CreateVehicleForm;
