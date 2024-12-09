import React from 'react'
interface PostSelectTransitionProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    transitionValue: string;
}
export default function PostSelectTransition({ onChange, transitionValue }: PostSelectTransitionProps) {

    return (
        <div className="flex justify-between w-[200px] mt-5 items-center">
            <div className="flex items-center justify-between">
                <input
                    type="radio"
                    value="For Sale"
                    name="transition.0.content"
                    id="sale"
                    className="mr-4 p-2"
                    checked={transitionValue === 'For Sale'} // Check if the value matches the state
                    onChange={onChange} // Call the onChange handler when clicked
                />
                <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph">Sale</span>
            </div>
            <div>
                <input
                    type="radio"
                    value="For Rent"
                    name="transition.0.content"
                    id="rent"
                    className="mr-4 p-2"
                    checked={transitionValue === 'For Rent'} // Check if the value matches the state
                    onChange={onChange} // Call the onChange handler when clicked
                />
                <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph">Rent</span>
            </div>
        </div>
    )
}
