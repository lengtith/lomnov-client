"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import imageFooter from "@/images/Vector.png";
import logoLomnov from "@/images/lomnov-logo.png";
import { menus } from "../header/Header";
export interface FooterProps {
  aboutText?: string;
  contactPhone?: string;
  contactLocation?: string;
  companyName?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
}

const Footer: React.FC<FooterProps> = ({
  aboutText,
  contactPhone,
  contactLocation,
  companyName,
  facebookLink = "",
}) => {
  return (
    <footer className="w-full h-auto bg-olive-drab flex flex-col ">
      <div className="relative py-10">
        <Image
          src={imageFooter}
          alt=""
          className=" absolute left-0 bottom-0 w-full object-cover "
        />
        <div className="xl:w-[1300px]  m-auto flex flex-col gap-5 py-5 ">
          <div className="grid sm:grid-cols-1 lg:grid-cols-4 lg:gap-28 gap-5 px-5 mb-10">
            <div className="flex flex-col items-center md:items-start gap-5">
              <Image src={logoLomnov} alt="" width={"100"} height={"100"} />
              <p className="text-center md:text-left text-neutral text-[14px]">
                Real Estate is an online real estate platform that allows users
                to buy, rent, sell, and manage their businesses.
              </p>
            </div>
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-[20px] font-[700] text-white">Contact Us</h1>
              <p className="text-[14px] text-neutral">
                Phone Number: (+855)12358993 {contactPhone} <br />
                Location: Corner Street 302 and Street 63 Sangkat Boeng Keng
                Kang Ti Muoy, Phnom Penh 12302 {contactLocation}
              </p>
            </div>
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-[20px] font-[700] text-white">Quick Link</h1>
              <div className="flex flex-col gap-1">
                {menus.map((item) => (
                  <Link
                    key={item.id}
                    href={item.slug}
                    className="text-[14px] text-neutral capitalize "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-[20px] font-[700] text-white">
                Socail Media
              </h1>
              <div className="flex flex-col gap-1">
                <Link href={facebookLink} className="flex ">
                  <span className="text-[14px] text-neutral"> Facebook</span>
                </Link>
                <Link href={facebookLink} className="flex ">
                  <span className="text-[14px] text-neutral"> Instargram</span>
                </Link>
                <Link href={facebookLink} className="flex ">
                  <span className="text-[14px] text-neutral"> Twitter</span>
                </Link>
                <Link href={facebookLink} className="flex ">
                  <span className="text-[14px] text-neutral"> Facebook</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex  flex-row justify-center items-center bg-charcoal text-white py-2">
        <p className=" text-[12px]">© 2024 LOMNOV All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
