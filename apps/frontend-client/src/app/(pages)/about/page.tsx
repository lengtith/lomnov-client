import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";
import Aboutimg from "@/images/aboutimg.png";
import gaol from "@/images/image.png"
import { HiMiniCheckCircle } from "react-icons/hi2";
import CartDevList from "@/components/molecules/cart-dev-list/CartDevList";
//========================================

const About = () => {
  return (
    <main className="w-full">
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />

        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      </header>
      <div className="w-full xl:w-[1300px] lg:m-auto h-full  ">
        <div className="flex justify-between items-center mt-[100px] gap-[80px]">
          <div className="w-[100%]">
            <Image src={Aboutimg} alt="aboutImg" width={789} height={460} />
          </div>
          <div className="w-[100%] h-auto ">
            <h1 className="text-[48px] text-olive-gray font-bold mb-5">About Us</h1>
            <p className="text-[16px] text-olive-gray">
              Sabai Code is a team of passionate students and aspiring
              developers committed to creating innovative digital solutions. Our
              goal is to build cutting-edge software that solves real-world
              problems while providing our members with hands-on experience in
              modern technologies.Sabai Code is a team of passionate students
              and aspiring developers committed to creating innovative digital
              solutions. Our goal is to build cutting-edge software that solves
              real-world problems while providing our members with hands-on
              experience in modern technologies.Sabai Code is a team of
              passionate students and aspiring developers committed to creating
              innovative digital solutions. Our goal is to build cutting-edge
              software that solves real-world problems while providing our
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-[100px] gap-[80px] items-center">
          <div className="w-[100%] h-auto ">
            <h1 className="text-[48px] text-olive-gray font-bold mb-5">Our Goal</h1>
            <ul>
               <li className="flex gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Learn about real estate industry needs and how to translate them into technical solutions</li>
               <li className="flex  gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Learn about real estate industry needs and how to translate them into technical solutions</li>
               <li className="flex gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Learn about real estate industry needs and how to translate them into technical solutions</li>
               <li className="flex  gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Learn about real estate industry needs and how to translate them into technical solutions</li>
              
            </ul>
          </div>
          <div className="w-[100%]">
            <Image src={gaol} alt="aboutImg" width={789} height={460} />
          </div>
        </div>
        <div className=" flex justify-center  items-center w-[100%] mb-[80px] mt-[80px]"><p className="text-[48px] text-olive-gray font-bold" >Our Team</p></div>
        <CartDevList/>
      </div>
    </main>
  );
};

export default About;
