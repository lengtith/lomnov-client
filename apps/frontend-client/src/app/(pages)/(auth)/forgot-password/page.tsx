"use client";
import React, { Suspense, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import banner from "@/images/banner.png";
import { useAuth } from "@/context/user";

const ForgotPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email");
  const [email, setEmail] = useState(emailFromParams || "");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus next input if it's not the last one
      if (index < 5 && value) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index]) {
      const previousInput = document.getElementById(`digit-${index - 1}`);
      previousInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/verify`,
        {
          email: email,
          code: verificationCode,
        }
      );

      if (response.data.message) {
        setSuccessMessage("Account verified successfully!");
        setErrorMessage(null);

        // Redirect to sign-in page after 2 seconds
        setTimeout(() => {
          window.location.href = "/signin"; // Replace with your actual sign-in page route
        }, 2000);
      } else {
        setErrorMessage("Verification failed. Please try again.");
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-full h-[660px] ">
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
      </div>



      <div className="absolute bg-white rounded-xl shadow-lg mx-auto top-[330px] px-5 mt-8 ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Verify Your Account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter the 6-digit code sent to your email to verify your account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-bold ml-1 mb-2 mt-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md mb-3"
                required
                aria-describedby="email-error"
              />
              <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                Please include a valid email address.
              </p>
            </div>


            <div className="flex justify-center gap-3 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md"
                />
              ))}
            </div>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p role="alert" className="text-green-500 mb-4">{successMessage}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? "bg-gray-400" : "bg-blue-500"} text-white w-full py-3 rounded-md`}
            >
              {isLoading ? "Verifying..." : "Verify Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  );
};

export default Page;
