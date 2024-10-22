import SearchInput from '@/components/ui/search';
import CreateVehicleButton from './buttons';
import SelectPageSize from '@/components/ui/selectPageSize';
import { useTranslations } from 'next-intl';

const VehiclesHeader = () => {
  const MAction = useTranslations('Actions');
  return (
    <div className="w-full mb-custom24 flex items-center justify-between gap-custom20">
      <SearchInput />
      <div className="flex items-center gap-custom20">
        <div className=" flex items-center gap-custom10">
          <span className="text-size16">{MAction('pageSize')}</span>
          <SelectPageSize />
        </div>
        <CreateVehicleButton />
      </div>
    </div>
  );
};

export default VehiclesHeader;
