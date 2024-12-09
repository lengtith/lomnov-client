import React from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton
} from 'next-share';
import { TwitterX, FacebookF, Telegram } from "@/icons";
export default function SharesToSocial({ linkURL }: { linkURL: string }) {
    return (
        <div className="absolute -right-10 mt-2 z-50 bg-white shadow-lg rounded-[5px] p-2 w-52 border border-gray-300">
            <FacebookShareButton
                url={`${linkURL}`}
                quote={''}
                hashtag={'#home #lomnov #realestate'}
            >
                <div className="flex items-center space-x-3 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 ">
                    <FacebookF props="w-5 h-5" />
                    <span>Facebook</span>
                </div>
            </FacebookShareButton>
            <TwitterShareButton
                url={`${linkURL}`}
            >
                <div
                    className="flex items-center space-x-3 text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                    <TwitterX props="w-5 h-5" />
                    <span>Twitter</span>
                </div>
            </TwitterShareButton>
            <TelegramShareButton
                url={linkURL}
               //title={'next-share is a social share buttons for your next React apps.'}
            >
                <div className="flex items-center space-x-3 text-[#24A1DE] py-2 px-4 rounded-lg hover:bg-pink-50">
                    <Telegram props="w-5 h-5" />
                    <span>Telegram</span>
                </div>
            </TelegramShareButton>
        </div>
    )
}
