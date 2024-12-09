// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import Link from "next/link";
// import axiosInstance from "@/libs/axios";
// import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
// import { Google, Facebook } from "@/icons";
// import InputField from "ms-ui-components/src/components/inputfield/InputField";


// // Define the Zod schema
// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// type LoginData = z.infer<typeof loginSchema>;

// const LoginForm: React.FC = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const response = await axiosInstance.post(API_ENDPOINTS.SIGN_IN, {
//         email: data.email,
//         password: data.password,
//       })
//       console.log('response', response)
//       if (response.status === 200) {
//         window.location.href = "/"
//       }
//     } catch (error: any) {
//       console.error("Login failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="w-full sm:w-[500px] lg:w-[550px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
//       {/* Title */}
//       <div className="text-center">
//         <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
//           Login to your account
//         </h2>
//         <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
//           Please enter your credentials to continue.
//         </p>
//       </div>

//       {/* Social Login Buttons */}
//       <div className="flex justify-center mb-8 space-x-4 mx-[45px] font-helvetica text-helvetica-h4">
//         <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
//           <Google props="w-5 h-5 mr-2" />
//           Google
//         </button>
//         <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
//           <Facebook props="w-5 h-5 mr-2" />
//           Facebook
//         </button>
//       </div>

//       <div className="flex items-center mb-8 mx-[45px]">
//         <div className="flex-grow h-px bg-charcoal"></div>
//         <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
//           or continue with email
//         </span>
//         <div className="flex-grow h-px bg-charcoal"></div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset>
//           {/* Email Input */}
//           <InputField
//             label="Email"
//             type="email"
//             register={register("email")}
//             error={errors.email?.message}
//             isFocused={emailFocused}
//             setIsFocused={setEmailFocused}
//           />

//           {/* Password Input */}
//           <InputField
//             label="Password"
//             type={passwordVisible ? "text" : "password"}
//             register={register("password")}
//             error={errors.password?.message}
//             isFocused={passwordFocused}
//             setIsFocused={setPasswordFocused}
//             hasToggleIcon={true}
//             toggleVisibility={togglePasswordVisibility}
//             visible={passwordVisible}
//           />
//         </fieldset>

//         {/* Remember Me and Forgot Password */}
//         <div className="flex justify-between items-center mb-8 mx-[45px]">

//           <Link href="/forgot-password" className="text-olive-green">
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Sign In Button */}
//         <div className="mx-[45px] mb-4">
//           <button
//             type="submit"
//             className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-neutral hover:bg-olive-green text-white rounded-[15px]"
//           >
//             Sign In
//           </button>
//         </div>
//       </form>

//       {/* Signup Link */}
//       <div className="text-center font-helvetica text-helvetica-text mt-4">
//         <p className="text-charcoal">
//           Do not have an account?
//           <a href="/signup" className="ml-[10px] text-olive-green">
//             Create an account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default withAuthRedirect(LoginForm);


"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { Google, Facebook } from "@/icons";
import InputField from "ms-ui-components/src/components/inputfield/InputField";
import withAuthRedirect from '../withAuth';
import { useAuth } from "@/context/user";

// Define the Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const emailInputRef = useRef<HTMLInputElement | null>(null); // Reference to email input
  const passwordInputRef = useRef<HTMLInputElement | null>(null); // Reference to password input
  const { siginWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Set focus on email input when component mounts
    }
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const onSubmit = async (data: LoginData) => {
    setLoading(true); // Set loading to true on form submission

    // Validate if the input is a valid email format
    if (!data.email.includes('@')) {
      setErrorMessage("Please enter a valid email address.");
      emailInputRef.current?.focus(); // Focus on email input if invalid
      setLoading(false);
      return; // Exit early if email is invalid
    }

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.SIGN_IN, {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );

      if (error.response) {
        const emailErrorMessage = error.response.data.message || "Email not found. Please try again.";
        setEmailErrorMessage(emailErrorMessage);
        emailInputRef.current?.focus(); // Focus on email input if incorrect
      }

      if (error.response) {
        const passwordErrorMessage = error.response.data.message || "Incorrect password. Please try again.";
        setPasswordErrorMessage(passwordErrorMessage);
        passwordInputRef.current?.focus(); // Focus on password input if incorrect
      }
    } finally {
      setLoading(false); // Reset loading to false after the request completes
    }
  };

  // Key handler to move focus from email to password on Enter
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      passwordInputRef.current?.focus(); // Focus on password input
    }
  };

  return (
    <div className="w-full sm:w-[500px] lg:w-[550px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
          Login to your account
        </h2>
        <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
          Please enter your credentials to continue.
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center mb-8 space-x-4 mx-[45px] font-helvetica text-helvetica-h4">
        <button onClick={async () => {await siginWithGoogle()}} className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal  hover:scale-105 hover:border-olive-green active:scale-95 ease-in-out duration-150 rounded-[15px]">
          <Google props="w-5 h-5 mr-2" />
          Google
        </button>
        <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:scale-105  hover:border-olive-green active:scale-95 ease-in-out duration-150 rounded-[15px]">
          <Facebook props="w-5 h-5 mr-2" />
          Facebook
        </button>
      </div>


      <div className="flex items-center mb-4 mx-[45px]">
        <div className="flex-grow h-px bg-charcoal"></div>
        <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
          or continue with email
        </span>
        <div className="flex-grow h-px bg-charcoal"></div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-center mx-[45px] mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          {/* Email Input */}
          <InputField
            label="Email"
            type="email"
            register={{
              ...register("email"),
              onKeyDown: handleEmailKeyDown, // Attach keydown handler for Enter key
              ref: (e: HTMLInputElement | null) => {
                register("email").ref(e); // Register ref with react-hook-form
                emailInputRef.current = e; // Attach to local ref
              },
            }}
            error={emailErrorMessage || errors.email?.message}
            isFocused={emailFocused}
            setIsFocused={setEmailFocused}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            register={{
              ...register("password"),
              ref: (e: HTMLInputElement | null) => {
                register("password").ref(e); // Register ref with react-hook-form
                passwordInputRef.current = e; // Attach to local ref
              },
            }}
            error={passwordErrorMessage || errors.password?.message}
            isFocused={passwordFocused}
            setIsFocused={setPasswordFocused}
            hasToggleIcon={true}
            toggleVisibility={togglePasswordVisibility}
            visible={passwordVisible}
          />
        </fieldset>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-8 mx-[45px]">
          <Link href="/forgot-password" className="text-olive-green">
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <div className="mx-[45px] mb-4">
          <button
            type="submit"
            className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-olive-green hover:scale-105 hover:bg-neutral active:bg-neutral active:scale-95 ease-in-out duration-300 text-white rounded-[15px]"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </div>
      </form>

      {/* Signup Link */}
      <div className="text-center font-helvetica text-helvetica-text mt-4">
        <p className="text-charcoal">
          Do not have an account?
          <a href="/signup" className="ml-[10px] text-olive-green">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default withAuthRedirect(LoginForm);
