
import React from 'react'

export default function ItalicIcon({width}: {width?:string}) {
    return (
        <svg width={`${width || '17'}`} height={`${width || '16'}`} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8799 2.56H7.11987" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.67992 12.8H3.91992" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.32 2.56L6.47998 12.8" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
