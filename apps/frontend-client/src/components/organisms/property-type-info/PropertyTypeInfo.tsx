import { RealEstateItem } from "@/libs/types/api-properties/property-response";

import PropertyTypeInfoVilla from "@/components/molecules/property-type/type-villa/PropertyTypeInfoVilla";
import PropertyTypeInfoShop from "@/components/molecules/property-type/type-shop/PropertyTypeInfoShop";
import PropertyTypeInfoLand from "@/components/molecules/property-type/type-land/PropertyTypeInfoLand";

const PropertyTypeInfo = ({ property }: { property: RealEstateItem }) => {
  if (property?.category[0]?.content.toLocaleLowerCase() !== 'shop' || property?.category[0]?.content.toLocaleLowerCase() !== 'land') {
    return (<PropertyTypeInfoVilla property={property} />)
  } else if (property?.category[0]?.content.toLocaleLowerCase() === 'shop') {
    return (
      <PropertyTypeInfoShop property={property} />
    )
  } else {
    return (
      <PropertyTypeInfoLand property={property} />

    )
  }
};

export default PropertyTypeInfo;
