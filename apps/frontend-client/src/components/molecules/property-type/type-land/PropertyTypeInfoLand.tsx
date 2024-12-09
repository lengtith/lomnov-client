
import PropertyLandSize from '@/components/atoms/property-land-size/PropertyLandSize'
import PropertyRoadSize from '@/components/atoms/property-road-size/PropertyRoadSize'
import { RealEstateItem } from '@/libs/types/api-properties/property-response'
import React from 'react'

function PropertyTypeInfoLand({ property }: { property: RealEstateItem }) {
    return (
        <>
            {property.detail[0] && (<PropertyLandSize property={property} /> )}
            {property.detail[0] && (<PropertyRoadSize property={property} /> )}
        </>
    )
}

export default PropertyTypeInfoLand