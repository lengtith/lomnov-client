import React from 'react'
interface IBIconProps { width: string }
export default function BIcon({ width }: IBIconProps) {
    return (
        <svg width={`${width || ' 16'}`} height={`${width || ' 16'}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.84009 2.56H8.96009C9.63904 2.56 10.2902 2.82971 10.7703 3.3098C11.2504 3.7899 11.5201 4.44104 11.5201 5.12C11.5201 5.79895 11.2504 6.4501 10.7703 6.93019C10.2902 7.41028 9.63904 7.68 8.96009 7.68H3.84009V2.56Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.84009 7.68H9.60009C10.279 7.68 10.9302 7.94971 11.4103 8.4298C11.8904 8.9099 12.1601 9.56104 12.1601 10.24C12.1601 10.919 11.8904 11.5701 11.4103 12.0502C10.9302 12.5303 10.279 12.8 9.60009 12.8H3.84009V7.68Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
