'use client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const CreateVehicleButton = () => {
  const MAction = useTranslations('Actions');
  const { push } = useRouter();
  const createVehicle = () => {
    push('/vehicles/new');
  };
  return (
    <Button variant="primary" onClick={createVehicle}>
      + {MAction('addVehicle')}
    </Button>
  );
};

export default CreateVehicleButton;
