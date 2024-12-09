import { Area } from '@/icons'
import { RealEstateItem } from '@/libs/types/api-properties/property-response'
import React from 'react'

function PropertyLandSize({property}:{property:RealEstateItem}) {
    return (
        <div className=" text-center  rounded-[10px]">
            <div className="flex items-center justify-center mb-[7px]">
                <Area props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
            </div>
            <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph  font-bold text-olive-green">
                spacious life
            </div>
            <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0]?.content?.land_size || 0}
            </div>
        </div>
    )
}

export default PropertyLandSize