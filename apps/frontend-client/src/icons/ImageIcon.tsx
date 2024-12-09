import React from 'react'

export default function ImageIcon({width}:{width?:string}) {
    return (
        <svg width={`${width || '17'}`} height={`${width || '16'}`} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.96 1.92H3.99997C3.29305 1.92 2.71997 2.49307 2.71997 3.2V12.16C2.71997 12.8669 3.29305 13.44 3.99997 13.44H12.96C13.6669 13.44 14.24 12.8669 14.24 12.16V3.2C14.24 2.49307 13.6669 1.92 12.96 1.92Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.24003 6.4C6.77022 6.4 7.20003 5.97019 7.20003 5.44C7.20003 4.9098 6.77022 4.48 6.24003 4.48C5.70984 4.48 5.28003 4.9098 5.28003 5.44C5.28003 5.97019 5.70984 6.4 6.24003 6.4Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.24 9.6L11.04 6.4L4 13.44" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
