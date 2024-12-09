import React, { ChangeEvent } from 'react';

interface IPostToggleButtonProps {
  isChecked?: boolean;
  onChecked?: (e: ChangeEvent<HTMLInputElement>) => void;
    values?: string | number | readonly string[] | undefined;
}

export default function PostToggleButton({ isChecked, onChecked ,values}: IPostToggleButtonProps) {
  console.log(isChecked);
  
  return (
    <>
      <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
        <div className="w-[380px] h-auto flex justify-between items-center">
          <span className="font-helvetica font-bold text-gray-700 leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph">Status*</span>
        </div>
      </div>
      <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
        <div className="w-full">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="status"
              checked={isChecked} // Bind the checkbox to the state
              onChange={onChecked} // Update state when the checkbox is clicked
              className="sr-only peer"
              value={values}
            />
            <div className={`relative w-11 h-6 rounded-full 
              ${isChecked ? 'bg-olive-green' : 'bg-olive-gray'} // Background color changes based on checked state
              peer-checked:bg-olive-green // Ensure it's blue when checked
              peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
              after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
            ></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-700">{isChecked ? 'Public' : 'Private'}</span>
          </label>
          <br />
          <span className="font-helvetica text-gray-500 leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph">
            This product will be hidden from all sales channels if it set to Private.
          </span>
        </div>
      </div>
    </>
  );
}
