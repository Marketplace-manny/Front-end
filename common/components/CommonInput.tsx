"use client";
import React, { useState, useEffect } from "react";
import { CommonInputProps } from "../types/common.types";

const CommonInput: React.FC<CommonInputProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  isPhoneNumber = false,
  autoComplete = "",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (isPhoneNumber) {
      setInputValue(formatPhoneNumber(value));
    } else {
      setInputValue(value);
    }
  }, [value, isPhoneNumber]);

  const formatPhoneNumber = (input: string) => {
    return input.replace(/\D/g, ""); // Remove all non-numeric characters
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = isPhoneNumber
      ? formatPhoneNumber(inputValue)
      : inputValue;
    setInputValue(formattedValue);
    onChange(formattedValue);
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${className}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        autoComplete={autoComplete}
        maxLength={isPhoneNumber ? 10 : undefined} // Limit to 10 characters for phone number
      />
    </div>
  );
};

export default CommonInput;
