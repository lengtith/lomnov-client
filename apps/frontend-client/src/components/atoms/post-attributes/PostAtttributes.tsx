import React, { ChangeEvent } from 'react'
import PostInputField from '../post-input-field/PostInputField'
interface IPostAtttributesProps {
    title?: string;
    values?: string | number | readonly string[] | undefined;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string
    types?: string;
    className?: string
    name?: string;
    readonly?: boolean;
}
export default function PostAtttributes({values,onChange}: IPostAtttributesProps) {
    return (
        <>
            <div className='bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]'>
                <div className='w-[380px] h-auto flex justify-between items-center'>
                    <span className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph font-bold text-gray-700'>Properties attributes*</span>
                </div>
            </div>
            <div className='bg-white shadow-md w-full h-full rounded-b-[12px] pb-10'>
                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField onChange={onChange} values={values} title='Bedrooms' name='detail.0.content.bedrooms' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                    <PostInputField onChange={onChange} values={values} title='Bathrooms' name='detail.0.content.bathrooms' className='border border-[#D9D9D9] shadow-sm' types='number' />
                </div>
                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField onChange={onChange} values={values} title='Spacious life (m2)' name='detail.0.content.size' className='border border-[#D9D9D9] shadow-sm ' types='text' />
                    <PostInputField onChange={onChange} values={values} title='Parking available' name='detail.0.content.parking' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                </div>
            </div>
        </>
    )
}
