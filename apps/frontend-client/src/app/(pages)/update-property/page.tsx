'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import banner from "@/images/banner.png";
import PostPropertiesTitle from '@/components/atoms/post-title/PostPropertiesTitle';
import PostRichEditor from '@/components/atoms/post-rich-editor/PostRichEditor';
import PostSelectTransition from '@/components/atoms/post-select-transition/PostSelectTransition';
import PostInputField from '@/components/atoms/post-input-field/PostInputField';
import PostSelectField from '@/components/atoms/post-select-field/PostSelectField';
import Map from '@/components/molecules/map/Map';

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Properties');
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <main className='w-full bg-[#E6E6E6]'>
      {/* banner */}
      <header className="relative w-full h-[300px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      </header>
      {/* form  */}
      <div className='w-full h-full'>
        <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
          <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Update properties</h1>
          <form className='w-full h-full p-2' action="">
            <div className='w-full block justify-between flex-row mt-2 gap-1'>
              {/* row 1 */}
              <PostPropertiesTitle title={[]} slug={[]} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } />
              {/* rich editor */}
              <PostRichEditor />
              {/* transition sale & rent  */}
              <h1 className='font-[600] leading-[5px] text-[25px] font-helvetica text-helvetica-paragraph mt-10 tracking-widest '>Type*</h1>
              <PostSelectTransition onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } transitionValue={''} />
              {/* row 2 */}
              <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                <PostInputField title='Price' placeholder='Properties price' />
                {/* Category Dropdown (div-based) */}
                <PostSelectField  title='Category' zIndex='20' onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                } } options={[]} defaultOption={{
                  name: ''
                }} />
              </div>
              <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                <PostInputField title='Address' placeholder='Properties address' />
                {/* Category Dropdown (div-based) */}
                <PostSelectField  title='Location' onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                } } options={[]} defaultOption={{
                  name: ''
                }} />
              </div>
              <div className='w-full mt-5'>
                <div className='bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]'>
                  <div className='w-[380px] h-auto flex justify-between items-center'>
                    <span className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph font-bold text-gray-700'>Properties attributes*</span>
                  </div>
                </div>
                <div className='bg-white shadow-md w-full h-full rounded-b-[12px] pb-10'>
                  <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField title='Bedrooms' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                    <PostInputField title='Bathrooms' className='border border-[#D9D9D9] shadow-sm' types='number' />
                  </div>
                  <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField title='Spacious life (m2)' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                    <PostInputField title='Parking available' className='border border-[#D9D9D9] shadow-sm ' types='number' />
                  </div>

                </div>
              </div>
              <div className="w-full mt-5">
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
                      <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>

                </div>
              </div>
              <div className="w-full mt-5">
                <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
                  <div className="w-[380px] h-auto flex justify-between items-center">
                    <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] font-bold text-gray-700 text-helvetica-paragraph">Map*</span>
                  </div>
                </div>
                <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
                  <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField className='border border-[#D9D9D9] shadow-sm ' placeholder='google map link!' />
                  </div>
                  <div className='w-full h-full -mt-8 -ml-5'>
                    <Map property='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509658!2d144.95592731584442!3d-37.81720977975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb69b6c8f7c0f89c!2sMelbourne!5e0!3m2!1sen!2sau!4v1510911234567' />
                  </div>
                </div>
              </div>
              <div className="w-full mt-5">
                <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
                  <div className="w-[380px] h-auto flex justify-between items-center">
                    <span className="font-helvetica font-bold text-gray-700 leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph">Status*</span>
                  </div>
                </div>

                <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
                  <div className="w-full ">

                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200   rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px]  after:border after:rounded-full after:h-5 after:w-5 after:transition-all "></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-700">Public</span>

                    </label><br />
                      <span className='font-helvetica text-gray-500 leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>This product will be hidden from all sales channels.</span>
                  </div>
                </div>
              </div>
              <div className='w-full h-full flex justify-end items-center py-2'>
                <div>
                  <button className='px-4 py-2 rounded-md m-2 font-medium text-slate-800 bg-slate-300'>Cancel</button>
                  <button className='px-4 py-2 text-white font-medium rounded-md bg-blue-700'>Update</button>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
    </main >
  );
}
