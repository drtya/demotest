import SWRProvider from '@/components/layout/provider/swrProvider';
import VehiclesPage from '@/components/pages/vehicles';
import { getVehicles } from '@/lib/actions/vehicle';


const Page = async () => {
  const vehicles = await getVehicles();
  
  return (
    <SWRProvider fallback={{'/api/vehicles':vehicles}}>
      <VehiclesPage />
    </SWRProvider>
  );
};

export default Page;
