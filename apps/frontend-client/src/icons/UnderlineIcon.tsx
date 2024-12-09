
import React from 'react'

export default function UnderlineIcon({width}: {width?:string}) {
    return (
        <svg width={`${width || '16'}`} height={`${width || '16'}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.2002 1.92V6.4C4.2002 7.41843 4.60477 8.39515 5.32491 9.11529C6.04505 9.83543 7.02176 10.24 8.0402 10.24C9.05863 10.24 10.0353 9.83543 10.7555 9.11529C11.4756 8.39515 11.8802 7.41843 11.8802 6.4V1.92" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.92017 13.44H13.1602" stroke="black" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
