// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";
// import axios from "axios";

// // Define the Zod schema
// const signupSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// // Type definition for form data
// type SignupData = z.infer<typeof signupSchema>;

// const SignupForm: React.FC = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [userNameFocused, setUserNameFocused] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data: SignupData) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/signup`,
//         {
//           email: data.email,
//           username: data.username,
//           password: data.password,
//         },
//       );

//       // Handle success - redirect to verification page
//       if (response.status === 200) {
//         window.location.href = `/verify?email=${encodeURIComponent(data.email)}`;
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setErrorMessage("Signup failed. Please try again.");
//     }
//   };
//   return (
//     <div className="max-w-[600px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
//       {/* Title */}
//       <div className="text-center">
//         <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
//           Register Form
//         </h2>
//         <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
//           Please fill in the details to create an account.
//         </p>
//       </div>

//       <div className="flex items-center mb-4 mx-[45px]">
//         <div className="flex-grow h-px bg-charcoal"></div>
//         <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
//           Welcome
//         </span>
//         <div className="flex-grow h-px bg-charcoal"></div>
//       </div>

//       {errorMessage && (
//         <p className="text-red-500 text-center mb-4">{errorMessage}</p>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset>
//             <InputField
//             label="Email"
//             type="email"
//             register={register("email")}
//             error={errors.email?.message}
//             isFocused={emailFocused}
//             setIsFocused={setEmailFocused}
//           />
//           <InputField
//             label="Username"
//             type="text"
//             register={register("username")}
//             error={errors.username?.message}
//             isFocused={userNameFocused}
//             setIsFocused={setUserNameFocused}
//           />
//           <InputField
//             label="Password"
//             type={passwordVisible ? "text" : "password"}
//             register={register("password")}
//             error={errors.password?.message}
//             isFocused={focusedField === "password"}
//             setIsFocused={() => setFocusedField("password")}
//             hasToggleIcon={true}
//             toggleVisibility={togglePasswordVisibility}
//             visible={passwordVisible}
//           />
//         </fieldset>


//         <div className="mx-[45px] mb-4">
//           <button
//             type="submit"
//             className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-neutral hover:bg-olive-green text-white rounded-[15px]"
//           >
//             Register
//           </button>
//         </div>
//       </form>

//       <div className="text-center font-helvetica text-helvetica-text mt-4">
//         <p className="text-charcoal">
//           Already have an account?
//           <a href="/signin" className="ml-[10px] text-olive-green">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";
import axios from "axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import axiosInstance from "@/libs/axios";
// Define the Zod schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^(?!\d+$)[\w]+$/, "Username cannot be only numbers"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Type definition for form data
type SignupData = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [userNameFocused, setUserNameFocused] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Refs for each input field
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Set focus on the email input when component mounts
    }
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    setLoading(true); // Set loading to true on form submission
    setEmailErrorMessage(null);
    setUsernameErrorMessage(null);
    setErrorMessage(null);

    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.SIGN_UP}`,
        {
          email: data.email,
          username: data.username,
          password: data.password,
        }
      );

      if (response.status === 200) {
        window.location.href = `/verify?email=${encodeURIComponent(data.email)}`;
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        // Check if message is defined before accessing
        if (typeof message === 'string') {
          // Set error messages based on server response or error type
          if (message.includes("email")) {
            setEmailErrorMessage(
              message.includes("already registered")
                ? "This email is already in use."
                : "Invalid email address format."
            );
          }

          if (message.includes("username")) {
            setUsernameErrorMessage(
              message.includes("already taken")
                ? "This username is already taken."
                : "Username cannot contain only numbers."
            );
          }

          setErrorMessage(message);
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading to false after the request completes
    }
  };

  // Move to the next field when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextFieldRef: React.RefObject<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextFieldRef.current?.focus();
    }
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
          Register Form
        </h2>
        <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
          Please fill in the details to create an account.
        </p>
      </div>

      <div className="flex items-center mb-2 mx-[45px]">
        <div className="flex-grow h-px bg-charcoal mb-4"></div>
        <span className="px-2 text-charcoal font-helvetica text-helvetica-text mb-5">
          Welcome
        </span>
        <div className="flex-grow h-px bg-charcoal mb-4"></div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center mb-8">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputField
            label="Email"
            type="email"
            register={{
              ...register("email"),
              ref: (e: HTMLInputElement | null) => {
                register("email").ref(e); // Register ref with react-hook-form
                emailInputRef.current = e; // Attach to local ref
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, usernameInputRef),
            }}
            error={emailErrorMessage || errors.email?.message}
            isFocused={emailFocused}
            setIsFocused={setEmailFocused}
          />

          <InputField
            label="Username"
            type="text"
            register={{
              ...register("username"),
              ref: (e: HTMLInputElement | null) => {
                register("username").ref(e); // Register ref with react-hook-form
                usernameInputRef.current = e; // Attach to local ref
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, passwordInputRef),
            }}
            error={usernameErrorMessage || errors.username?.message}
            isFocused={userNameFocused}
            setIsFocused={setUserNameFocused}
          />

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
            error={errors.password?.message}
            isFocused={focusedField === "password"}
            setIsFocused={() => setFocusedField("password")}
            hasToggleIcon={true}
            toggleVisibility={togglePasswordVisibility}
            visible={passwordVisible}
          />
        </fieldset>

        <div className="mx-[45px] mb-4">

          <button
            type="submit"
            className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-olive-green hover:scale-105 hover:bg-neutral active:bg-neutral active:scale-95 ease-in-out duration-150 text-white rounded-[15px]"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </div>
      </form>

      <div className="text-center font-helvetica text-helvetica-text mt-4">
        <p className="text-charcoal">
          Already have an account?
          <a href="/signin" className="ml-[10px] text-olive-green">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;


