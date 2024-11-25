"use client";
import React, { useState } from "react";
import {
  MdCalendarMonth,
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Input(
  {
    className,
    children,
    labelText,
    placeholderText,
    variant,
    type = "text",
    error,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const iconStyles = `text-descriptionColor group-focus-within:text-primaryColor duration-200 ${
    error && "text-red-500"
  }`;

  return (
    <div className={className + " w-full"}>
      <section className='flex justify-between items-center'>
        {labelText && (
          <label
            htmlFor={"txt" + labelText}
            className='block mb-2 text-sm font-extrabold font-nunito text-gray-900'
          >
            {labelText}
          </label>
        )}
        {type === "password" && variant === "login" && (
          <span className='block mb-2 text-sm font-medium text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'>
            Nie pamiętasz hasła?
          </span>
        )}
      </section>
      <div className='flex group relative'>
        <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-borderColor border-e-0 rounded-s-md'>
          {type === "email" ? (
            <MdEmail className={iconStyles} />
          ) : type === "text" ? (
            <MdPerson className={iconStyles} />
          ) : type === "tel" ? (
            <MdPhone className={iconStyles} />
          ) : type === "password" ? (
            <MdLock className={iconStyles} />
          ) : type === "date" ? (
            <MdCalendarMonth className={iconStyles} />
          ) : (
            <></>
          )}
        </span>
        <input
          type={showPassword ? "text" : type}
          id={"txt" + labelText}
          {...props}
          ref={ref}
          className={`appearance-none focus:outline-none focus:ring-0 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-primaryColor focus:border-primaryColor block flex-1 min-w-0 w-full text-sm border-borderColor p-2.5 autofill:bg-green-100 ${
            error && "border-red-500 border"
          }`}
          placeholder={placeholderText}
        />
        {type === "password" && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='inline-flex h-full items-center cursor-pointer px-1 text-sm text-gray-900 absolute right-2 top-1/2 -translate-y-1/2'
          >
            {showPassword ? (
              <IoEyeOff className='text-lg text-gray-500' />
            ) : (
              <IoEye className='text-lg text-gray-500' />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
