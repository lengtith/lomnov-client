import Image from 'next/image';
import React, { ChangeEvent } from 'react'
interface IPostUploadImagesProps {
    OnImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    imagePreviews?: string[];
    errMsg: boolean;
}
export default function PostUploadImages({ OnImageChange, imagePreviews, errMsg = true }: IPostUploadImagesProps) {
    return (
        <>
            <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
                <div className="w-[380px] h-auto flex justify-between items-center">
                    <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] font-bold text-gray-700 text-helvetica-paragraph">Images*</span>
                </div>
            </div>

            <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
                <div className="flex items-center justify-center w-full  border  border-[#D9D9D9] shadow-sm rounded-lg">
                    <label htmlFor="dropzone-file" className="w-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center">
                            <p className="mb-2 text-[17px] font-semibold text-olive-drab pb-[7px] pt-[15px]"><span className=" text-gray-900 text-[17px]">Drag and Drap you file or</span> browse</p>
                        </div>
                        <input id="dropzone-file" type="file" name='images' accept="image/*" multiple onChange={OnImageChange} className="hidden" />
                    </label>
                    {/* Display Selected Image */}
                </div>
                <div className='mt-3 grid grid-cols-8 gap-4'>
                    {imagePreviews?.map((imageUrl, index) => (
                        <div key={index} className="w-full">
                            <Image src={imageUrl} alt={`Selected Image ${index + 1}`} width={150} height={150} className="object-cover w-[150px] h-[200px] rounded-lg" />
                        </div>
                    ))}
                </div>
                {errMsg ? '' : <span className='text-red-700 font-helvetica leading-3 tracking-widest my-3 text-[15px] text-helvetica-paragraph'>{`images are required for thumnails*`}</span>}
            </div>
        </>
    )
}
