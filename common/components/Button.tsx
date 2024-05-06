import { Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { ButtonProps } from "@/common/types/common.types";

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  type = "button",
  classNames = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      aria-disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 bg-orange-900 hover:bg-orange-700  rounded-xl text-white font-semibold ${classNames}`}
      onClick={handleClick}
    >
      {isSubmitting && <Spinner size="sm" color="white" />}
      {leftIcon && (
        <Image
          src={leftIcon}
          width={14}
          height={14}
          alt="icon left"
          layout="fixed"
        />
      )}
      {title}
      {rightIcon && (
        <Image
          src={rightIcon}
          width={14}
          height={14}
          alt="icon right"
          layout="fixed"
        />
      )}
    </button>
  );
};

export default Button;
