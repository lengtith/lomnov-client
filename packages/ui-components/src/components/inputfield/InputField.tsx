"use client";

//**! Old */
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// interface InputFieldProps {
//   type?: string;
//   name: string;
//   value: string;
//   placeholder?: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   error?: string;
//   className?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   type = "text",
//   name,
//   value,
//   placeholder,
//   onChange,
//   error,
//   className = "",
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

//   const preventBlur = (e: React.MouseEvent<HTMLSpanElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="relative">
//       <input
//         type={showPassword && type === "password" ? "text" : type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder={placeholder}
//         className={`${className}`}
//       />
//       {type === "password" && isFocused && (
//         <span
//           onMouseDown={preventBlur}
//           onClick={togglePasswordVisibility}
//           className="absolute right-4 top-[30%] cursor-pointer"
//         >
//           {showPassword ? (
//             <FaEyeSlash className="text-gray-400 text-xl" />
//           ) : (
//             <FaEye className="text-gray-400 text-xl" />
//           )}
//         </span>
//       )}
//       {error && (
//         <span className="text-red-500 text-sm absolute -left-[0%] top-11">
//           {error}
//         </span>
//       )}
//     </div>
//   );
// };

// export default InputField;

//** New */

import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputFieldProps {
  label: string;
  type: string;
  register: any;
  error?: string;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  hasToggleIcon?: boolean;
  toggleVisibility?: () => void;
  visible?: boolean;

}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  error,
  isFocused,
  setIsFocused,
  hasToggleIcon = false,
  toggleVisibility,
  visible = false,


}) => {
  return (
    <div className="relative mb-12  mx-[45px]">
      <input
        type={type}
        {...register}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        className={`w-full px-3 h-[45px]  border rounded-[8px] bg-transparent focus:outline-none focus:border-olive-green  placeholder-transparent ${error ? "border-red-500" : "border-charcoal"}`}
        placeholder=" "
        aria-label={label}
      />
      <label
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out
          ${isFocused || error ? "-translate-y-[47px] font-helvetica text-l  font-bold text-olive-green" : "font-helvetica text-xl text-charcoal"} ${error ? "font-helvetica text-helvetica-h5 text-red-500" : "font-helvetica text-helvetica-h5 text-charcoal"}`}
      >
        {label}
      </label>
      {error && (
        <div className="absolute font-helvetica text-helvetica-small -bottom-5 text-red-500 ">
          {error}
        </div>
      )}
      {hasToggleIcon && toggleVisibility && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 p-1 text-gray-500"
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default InputField;
