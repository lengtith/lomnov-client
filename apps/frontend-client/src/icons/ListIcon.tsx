
import React from 'react'
type TListIconProps = {width?:string}
export default function ListIcon({width}: TListIconProps) {
    return (
        <svg width={`${width || ' 16'}`} height={`${width || ' 16'}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.55981 3.84H13.8798" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.55981 7.68H13.8798" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.55981 11.52H13.8798" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.35986 3.84H2.36626" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.35986 7.68H2.36626" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.35986 11.52H2.36626" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
