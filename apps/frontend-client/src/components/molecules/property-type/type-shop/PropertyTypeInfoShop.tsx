import PropertyLandSize from '@/components/atoms/property-land-size/PropertyLandSize'
import PropertyParking from '@/components/atoms/property-parking/PropertyParking'
import { RealEstateItem } from '@/libs/types/api-properties/property-response'
import React from 'react'

const PropertyTypeInfoShop = ({property}:{property:RealEstateItem}) => {
  return (
    <>
        {property.detail[0] && <PropertyLandSize property={property}/>}
        {property.detail[0] && (<PropertyParking property={property}/>)}
    </>
  )
}

export default PropertyTypeInfoShop