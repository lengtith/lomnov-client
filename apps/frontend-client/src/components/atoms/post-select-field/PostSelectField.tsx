import React, { useState } from 'react';

type ISelectOptionTypes = {
    name: string;
}[];

interface IPostSelectFieldProps {
    zIndex?: string;
    title?: string;
    name?: string;
    errorMsg?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedOption?: Array<{ content: string; language: string }>;
    options: ISelectOptionTypes;
    defaultOption: { name: string };
}

export default function PostSelectField({
    zIndex,
    title,
    options,
    name,
    errorMsg = true,
    onChange,
    selectedOption,
    defaultOption,
}: IPostSelectFieldProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(defaultOption.name); // Set the default option

    const handleOptionClick = (optionName: string) => {
        setSelected(optionName);  // Update the selected option
        onChange({ target: { name: name || '', value: optionName } } as React.ChangeEvent<HTMLInputElement>);  // Call the onChange handler
        setIsOpen(false);  // Close the dropdown after selection
    };

    return (
        <div className={` ${zIndex ? `z-${zIndex}` : 'z-10'} w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1`}>
            <div className='w-full'>
                <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>{title}*</p>
                <div className="relative w-full">
                    <button
                        name='category'
                        type='button'
                        onClick={() => setIsOpen(!isOpen)}
                        className='flex items-center text-center justify-between w-full rounded-lg border-none bg-white shadow-sm py-[4.7px] px-[5px] focus:ring-olive-green focus:outline-none focus:ring-2'
                    >
                        <input
                            value={selected} // Display the selected option in the input field
                            readOnly
                            name={name}
                            className="text-gray-700 border-none outline-none focus:ring-transparent"
                        />
                        <svg
                            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-[#E0E0DC] shadow-lg rounded-md max-h-60 overflow-auto p-2">
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-olive-green rounded-md"
                                    onClick={() => handleOptionClick(option.name)} // Handle option selection
                                >
                                    <span className="text-black text-[14px] hover:text-white w-full capitalize">
                                        {option.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {errorMsg ? '' : <span className='text-red-700 font-helvetica leading-3 tracking-widest my-3 text-[15px] text-helvetica-paragraph'>{`${name} are required value*`}</span>}
            </div>
        </div>
    );
}
