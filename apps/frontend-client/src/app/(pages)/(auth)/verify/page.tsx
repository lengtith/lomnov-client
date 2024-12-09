"use client";
import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import banner from "@/images/banner.png";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
const VerifyAccount: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isVerifiedAttempted, setIsVerifiedAttempted] = useState<boolean>(false);

  // Create an array of refs for each input field
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // Focus on the first input field when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setIsVerifiedAttempted(false); // Reset verification attempt flag on code change

      // Move focus to the next input if it exists
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
      setIsVerifiedAttempted(false); // Reset verification attempt flag on backspace
    } else if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = useCallback(async () => {
    if (isLoading || !email || code.some((digit) => digit === "") || isVerifiedAttempted) return;

    setIsLoading(true);
    setErrorMessage(null); // Clear previous error message
    setIsVerifiedAttempted(true); // Set the verification attempt flag
    const verificationCode = code.join("");

    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.VERIFY}`,
        { email, code: verificationCode },
      );

      if (response.data.message) {
        setSuccessMessage("Account verified successfully. Account created.");
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        setErrorMessage("Verification failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage("Invalid verification code. Please try again.");
            break;
          case 404:
            setErrorMessage("Account not found. Please check your email.");
            break;
          default:
            setErrorMessage("Something went wrong. Please try again later.");
        }
      } else {
        setErrorMessage(
          "Network error. Please check your connection and try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [code, email, isLoading, router, isVerifiedAttempted]);

  const handleResendCode = async () => {
    if (!email) {
      setResendMessage(
        "No email provided. Unable to resend verification code.",
      );
      return;
    }


    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.RESEND_CODE}`,
        { email },
      );
      setResendMessage(
        response.data.message
          ? "Verification code resent successfully."
          : "Failed to resend code. Please try again.",
      );
    } catch {
      setResendMessage("Unable to resend code. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "") && !isVerifiedAttempted) {
      handleSubmit();
    }
  }, [code, handleSubmit, isVerifiedAttempted]);

  return (
    <div className="w-full relative bg-gray-100 min-screen flex flex-col items-center">
      <header className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Welcome to Lomnov!</h1>
        </div>
        <div className="absolute left-0 bottom-[130px] w-[450px] h-px bg-white"></div>
        <div className="absolute left-[25%] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
          <p>Please fill your code that we sent to your email.</p>
        </div>
      </header>

      <form className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 mt-[-50px] z-10">
        <div className="text-center mb-6 text-black">
          <h1 className="text-xl md:text-4xl font-coolvetica mb-3">
            Verify Account
          </h1>
          <p>Enter the 6-digit code sent to your email to verify your account.</p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el; // Store each input in the ref array
              }}
              id={`digit-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-md text-xl focus:ring-2 shadow-sm"
            />
          ))}
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || code.some((digit) => digit === "")}
          className={`${isLoading ? "bg-gray-300" : "bg-olive-drab hover:bg-natural hover:scale-105 active:bg-natural active:scale-95"} w-full py-3 rounded-lg font-semibold transition-transform duration-150`}
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </button>


        {resendMessage && (
          <p className="text-gray-500 text-center mt-4">{resendMessage}</p>
        )}
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="mt-4 w-full text-blue-600"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccount />
    </Suspense>
  );
};

export default Page;
