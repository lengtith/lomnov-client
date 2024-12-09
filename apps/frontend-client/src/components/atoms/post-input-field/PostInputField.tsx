import React, { ChangeEvent } from 'react'

interface IPostInputFieldProps {
  title?: string;
  values?: string | number | readonly string[] | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string
  types?: string;
  className?: string
  name?: string;
  readonly?: boolean;
  errorMsg?: boolean;
}
function extractName(name:string | undefined): string{
  if(name?.includes('.')){
    const [...keys] = name.split('.');
    return keys[0];
  }else return name!;
}
export default function PostInputField({ title, readonly, values, onChange, name, className, placeholder, types, errorMsg = true}: IPostInputFieldProps) {
  const named = extractName(name);
  // console.log(errorMsg);
  
  return (
    <div className='w-1/2'>
      <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>{title}</p>
      <input name={name} readOnly={readonly} value={values} onChange={onChange} className={`${className ? `${className} w-full rounded-lg bg-white py-[13px] px-[12px] focus:ring-olive-green focus:outline-none focus:ring-2 shadow-sm` : 'w-full rounded-lg border-none  bg-white shadow-sm py-[13px] px-[12px] focus:ring-olive-green focus:outline-none focus:ring-2'} `} placeholder={placeholder} type={types} />
      {errorMsg ? '' : <span className='text-red-700 font-helvetica leading-3 tracking-widest my-3 text-[15px] text-helvetica-paragraph'>{`${named} are require value*`}</span>}
    </div>
  )
}
