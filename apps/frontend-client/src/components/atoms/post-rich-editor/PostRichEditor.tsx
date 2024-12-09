import BIcon from '@/icons/BIcon'
import ImageIcon from '@/icons/ImageIcon'
import ItalicIcon from '@/icons/ItalicIcon'
import LinkIcon from '@/icons/LinkIcon'
import ListIcon from '@/icons/ListIcon'
import StrikethroughIcon from '@/icons/StrikethroughIcon'
import UnderlineIcon from '@/icons/UnderlineIcon'
import React, { ChangeEventHandler } from 'react'

interface IPostRichEditorProps {
    title?: string;
    values?: string | number | readonly string[] | undefined;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    className?: string;
    name?: string;
    readonly?: boolean;
    errorMsg?: boolean;
}

export default function PostRichEditor({ values, onChange, placeholder, className, readonly, name, title, errorMsg = true}: IPostRichEditorProps) {
    return (
        <div className='w-full mt-7'>
            <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>{title}</p>
            <div className='bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]'>
                <div className='w-[380px] h-auto flex justify-between items-center'>
                    <BIcon width='25' />
                    <StrikethroughIcon width='25' />
                    <UnderlineIcon width='25' />
                    <ItalicIcon width='25' />
                    <LinkIcon width='25' />
                    <ListIcon width='25' />
                    <ImageIcon width='25' />
                </div>
            </div>
            <div className='bg-white shadow-md w-full h-full p-2 rounded-b-[12px]'>
                <textarea
                    readOnly={readonly}
                    onChange={onChange}
                    value={values}
                    name={name}
                    className={`${className} w-full h-full border-none focus:ring-0 outline-none`}
                    placeholder={placeholder || 'Describe your property'}
                    rows={8}
                    id=""
                />
            </div>
            {errorMsg ? '' : <span className='text-red-700 font-helvetica leading-3 tracking-widest my-3 text-[15px] text-helvetica-paragraph'>{`${name} are require value*`}</span>}

        </div>
    )
}
