import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";
import Phone from "@/icons/Phone";
import Email from "@/icons/Email";
import { PiTelegramLogoLight } from "react-icons/pi";
import { TiSocialFacebookCircular } from "react-icons/ti";
import service from "@/images/service.png";
import MeaaseImg from "@/images/mess.png";

const Context = () => {
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
        <div className="absolute left-[24%] bottom-[150px] font-helvetica text-helvetica-h2 font-bold text-white">
          <h1>We Are Enjoy To Reply You</h1>
        </div>
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[550px] h-px bg-white"></div>
      </header>
      <div className="w-full xl:w-[1300px] lg:m-auto h-full mt-[80px] ">
        <div className="text-center mt-[80px]">
          <p className="text-olive-green font-helvetica text-helvetica-h1 font-bold">
            Contact with social
          </p>
        </div>
        <div className="flex justify-between mt-[80px] items-center">
          <div className="">
            <div className="flex w-auto justify-start  items-center mb-[40px]">
              <Phone props="w-[50px] " />
              <p className="ml-[20px] text-[32px] text-olive-gray">
                068 098 3434
              </p>
            </div>

            <div className="flex w-auto justify-start  items-center mb-[40px]">
              <Email props="w-[50px]" />
              <p className="ml-[20px] text-[32px] text-olive-gray">
                www.studentsabaicode.com
              </p>
            </div>

            <div className="flex w-auto justify-start  items-center mb-[40px]">
              <PiTelegramLogoLight className="w-[50px] text-olive-green text-[50px]" />
              <p className="ml-[20px] text-[32px] text-olive-gray">
                068 098 3434
              </p>
            </div>

            <div className="flex w-auto justify-start  items-center mb-[40px]">
              <TiSocialFacebookCircular className="w-[50px] text-olive-green text-[50px]" />
              <p className="ml-[20px] text-[32px] text-olive-gray">
                studentSabaicode
              </p>
            </div>
          </div>
          <div>
            <Image src={service} alt="service" width="600" height="600" />
          </div>
        </div>
      </div>
      <div className="w-full xl:w-[100%] h-full bg-slate-300 mt-[50px] ">
        <div className="w-full xl:w-[1300px] lg:m-auto h-full ">
          <div className="flex justify-between items-center  pb-[80px] w-[100%]">
            <div className="flex justify-center  w-[100%] mt-[50px]">
              <Image
                src={MeaaseImg}
                alt="message1"
                width="500"
                height="600"
                className="flex items-center mt-[30px]"
              />
            </div>
            <div className="w-[100%]">
              <div className="mb-[50px]">
                <p className="text-olive-green font-helvetica text-helvetica-h1 font-bold">
                  Contact with email
                </p>
              </div>
              <form className=" w-[100%] h-[500px] ">
                <label className="text-[24px] text-olive-gray mb-5">
                  Full Name
                </label>
                <br />
                <br />
                <input
                  type="text"
                  className="w-[100%] border-3 border-olive-gray rounded-[10px] bg-inherit"
                  placeholder="Full Name"
                />
                <br />
                <br />
                <label className="text-[24px] text-olive-gray ">
                  Email Address
                </label>
                <br />
                <br />
                <input
                  type="email"
                  className="w-[100%]  border-3 border-olive-gray rounded-[10px] bg-inherit"
                  placeholder="Email Address"
                />
                <br />
                <br />
                <label className="text-[24px] text-olive-gray ">Message</label>
                <br />
                <br />
                <textarea
                  className="w-[100%] h-[200px] border-3 border-olive-gray rounded-[10px] bg-inherit "
                  placeholder="Message"
                />
                <br />
                <br />
                <button className="w-[150px] h-[40px] bg-olive-drab  font-bold text-white text-[16px] rounded-[10px] hover:bg-olive-gray">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Context;
