"use client";
import { useState } from "react";
import chevDown from "../../../../public/icons/chevdown.svg";
import chevUp from "../../../../public/icons/chevup.svg";
import Image from "next/image";

type DropdownProps = {
  title: string;
  options?: {
    title: string;
    setter: () => void;
  }[];
  value?: string;
  error?: string | false;
};

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { title, options, value, error } = props;

  const clickItem = (setter: () => void) => {
    setter();
    setIsOpen(false);
  };

  const mouseOut = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const iconStyle = {
    filter:
      "invert(93%) sepia(15%) saturate(6235%) hue-rotate(345deg) brightness(91%) contrast(111%)",
  };

  return (
    <div className="relative">
      <span className="mb-1 text-text h-6 flex text-xs xl:text-base">
        {title}
      </span>
      <div className="flex flex-row">
        <div>
          <div
            className={`border-2 border-${
              error ? "accentLight" : "text"
            } w-24 rounded text-black bg-white pl-1 h-[28px]`}
          >
            {value}
          </div>
          <span
            className={`h-3.5 text-xs xl:text-base text-${
              error ? "accentLight" : "primaryDark"
            }`}
          >
            {error ? error : "x"}
          </span>
        </div>
        <div
          className={`flex items-start mt-1 ml-1 pb-1 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={isOpen ? chevUp : chevDown}
            alt="chev"
            width={20}
            height={20}
            style={iconStyle}
          />
        </div>
      </div>
      {isOpen && (
        <div
          className={`w-36  rounded-lg absolute h-auto max-h-32 overflow-auto border-2 bg-primaryDark border-tertiaryDark
             top-16
          `}
          onMouseLeave={() => mouseOut()}
        >
          {options?.map((o, idx) => (
            <div
              key={idx}
              onClick={() => clickItem(o.setter)}
              className={`flex flex-row p-2 items-center text-text hover:bg-primaryLight hover:text-tertiaryDark rounded-lg cursor-pointer`}
            >
              {o.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
