'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CreateVehicleButton = () => {
  const { push } = useRouter();
  const createVehicle = () => {
    push('/vehicles/new')
  };
  return <Button variant="primary" onClick={createVehicle}>+ Add Vehicle</Button>;
};

export default CreateVehicleButton;
