
import { fetchMenus } from '@/libs/fetch-data/api';
import ContainerHeader from './ContainerHeader';

const ServerHeader = async () => {
  const menus = await fetchMenus();
  return (
    <ContainerHeader menu={menus} />
  );
};

export default ServerHeader;
