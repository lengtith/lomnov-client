'use client'
import React from 'react'
import SelectProperties from '../select-properties/SelectProperties'
import SelectLocations from '../select-locations/SelectLocations'
import SelectPrice from '../select-price/SelectPrice'

const VisitProfileSearch = () => {
    const handlePropertyChange = () => { }
    const handleLocationChange = () => { }
    const handlePriceChange = () => { }
    const handleSearch = () => { }
    return (
        <div className="w-full h-full ">
            <div className="flex z-10 flex-col gap-3 w-full xl:w-[1300px] lg:m-auto">
                <div className="w-full lg:w-fit lg:flex grid grid-cols-2 lg:grid-cols-4 items-center gap-5 mt-3">
                    <SelectProperties backGroundColor='bg-white' onChange={handlePropertyChange} />
                    <SelectLocations backGroundColor='bg-white' onChange={handleLocationChange} />
                    <SelectPrice backGroundColor='bg-white' onChange={handlePriceChange} />
                    <button className="bg-[#B5B49E] text-charcoal text-helvetica-paragraph px-5 py-2 rounded-md lg:w-[120px]
                hover:bg-olive-green hover:scale-105 active:bg-olive-green active:scale-95 transition-transform duration-150 hover:text-white"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VisitProfileSearch