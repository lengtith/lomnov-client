import { SetStateAction, useState } from "react";
import Image from "next/image";
import camboFlag from "@/images/combo.jpg";
import englishFlage from "@/images/english.jpg";
interface Option {
  label: string;
  imgSrc: string| any;
}

interface CustomDropdownProps {
  options: Option[];
  defaultOption: Option;
}

const options = [
  { label: "English", imgSrc: englishFlage },
  { label: "Khmer", imgSrc: camboFlag },
  // Add more options as needed
];
const defaultOption = { label: "English", imgSrc: englishFlage };
console.log(defaultOption);
const SelectLang: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: SetStateAction<Option>) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        className="flex items-center justify-between w-full px-4 py-2  "
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <Image
              src={selectedOption.imgSrc}
              alt={selectedOption.label}
              className="w-6 h-4 mr-2 object-cover"
            />
            <span className="text-white">{selectedOption.label}</span>
          </div>
        ) : (
          ""
        )}
        <svg
          className={`w-5 h-5 ml-2 transition-transform transform text-white ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-2 rounded-md overflow-hidden shadow-lg p-2 bg-[#E0E0DC]">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 cursor-pointer rounded-md hover:bg-olive-green group-hover:text-white"
            onClick={() => handleOptionClick(option)}
          >
            <div className="flex items-center space-x-2 group-hover:text-white">
              <Image src={option.imgSrc} alt={option.label} className="w-6 h-4 object-cover" />
              <span className="text-black hover:text-white  ">{option.label}</span>
            </div>
          </div>
        ))}
      </div>

      )}
    </div>
  );
};

export default SelectLang;
