//will be added later on

import { MouseEventHandler } from "react";

export interface Product {
  supply: any;
  id: string;
  name: string;
  price: number;
  description: string;
  seller_name: string;
  seller_id: string;
}

export type ButtonProps = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
  classNames?: string;
};

export type ProductListProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  seller_name: string;
  imageUrl?: string;
  view?: "grid" | "list";
};

export type FormFieldProps = {
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  isNumber?: boolean;
  min?: number;
  setState: (value: string) => void;
};

export type ProductDescriptionProps = {
  description: string;
  view: "grid" | "list";
};
export type ProductNameProps = {
  name: string;
};

export type CommonInputProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string, cleanValue?: string) => void;
  required?: boolean;
  isPhoneNumber?: boolean;
  autoComplete?: string;
  className?: string;
};

export type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};
