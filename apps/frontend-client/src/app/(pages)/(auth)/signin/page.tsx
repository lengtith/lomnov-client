import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";
import LoginForm from "@/components/organisms/auth/form-login/LoginForm";

const SignInPage = () => {
  return (
    <div className="w-full">
      <div className="w-full relative mb-[580px]">
        {/* Banner */}
        <header className="relative w-full h-[400px]">
          <Image
            src={banner}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />

          {/* Title */}
          <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
            <h1>Welcome Back!</h1>
          </div>

          {/* Line */}
          <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

          {/* Description */}
          <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
            <p>
              Access your account to view saved properties, manage your
              preferences, and more.
            </p>
          </div>
        </header>
        <div className="w-full absolute mx-auto top-[330px] px-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
