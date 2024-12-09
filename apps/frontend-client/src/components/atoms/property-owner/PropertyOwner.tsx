
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface PropertyOwnerProps {
    cognitosub: string;
    propertyOwner: {
        _id: string;
        cognitoSub: string,
        profile: string[],
        userName: string,
        phoneNumber: string
    }
}
function PropertyOwner({ cognitosub, propertyOwner }: PropertyOwnerProps) {
    return (
        <section className='rounded-lg h-auto'>
            <div className='flex items-center space-x-4'>
                {/* Profile Image */}
                <div className='w-[70px] h-[65px] rounded-full bg-gray-300 overflow-hidden'>
                    <Link
                        className={`${propertyOwner?.profile?.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        href={propertyOwner?.profile?.length > 0 ? `/view-profile/${cognitosub}` : '#'}
                    >
                        <Image
                            src={`${propertyOwner?.profile?.length > 0 ? propertyOwner.profile[propertyOwner.profile.length - 1] : '/default-profile.jpeg'}`}
                            alt="Profile Image"
                            width={70}
                            height={70}
                            className={`object-cover ${propertyOwner?.profile?.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        />
                    </Link>
                </div>

                {/* User Info */}
                <div className='w-[60%]'>
                    <p className='text-[16px] font-[400] leading-[24px] text-[#000000]'>Listed by</p>
                    <h2 className='text-[16px] leading-[24px] text-[#252728] font-[700] '>{propertyOwner?.userName || 'Unknow'}</h2>
                </div>
            </div>

            {/* Contact Button Section */}
            <div className='mt-4 border px-[25px] py-[5px] border-[#7D7757] z-10 rounded-[5px]'>
                <Link href={`/view-profile/contact/${cognitosub}`} className='w-full leading-[24px] text-[#252728] font-[700] rounded-lg focus:outline-none'>
                    Contact {propertyOwner?.userName || 'Unknow'}
                </Link>
            </div>
        </section>
    )
}

export default PropertyOwner
