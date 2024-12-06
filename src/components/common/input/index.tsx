"use client";

import { ComponentProps, forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import { useToggle } from "@/hooks";
import cn from "@/utils/cn";

interface InputProps extends Omit<ComponentProps<"input">, "type"> {
  /** input의 placeholder 속성입니다. */
  placeholder: string;
  /** input 의 타입입니다. text, email, password */
  type?: "text" | "email" | "password" | "number";
  /** 추가적인 className입니다. 너비와 높이 등을 설정할 수 있습니다. */
  className?: string;
  /** 에러 메시지입니다. */
  error?: string;
  isForm?: boolean;
  inputSuffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      type = "text",
      isForm = false,
      inputSuffix,
      className,
      error,
      ...props
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const { value: isVisible, handleToggle } = useToggle();

    const handleClickVisible = () => {
      handleToggle();
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password",
      );
    };

    return (
      <div className={cn(!isForm && "relative w-full")}>
        <input
          className={cn(
            isForm
              ? "pb-2 flex-1 border-b border-solid border-[#505050] placeholder:text-right focus:outline-none text-right pr-18"
              : "w-full rounded-lg py-2 pl-13 pr-10 leading-tight text-gray-700 border border-gray-300 bg-white focus:border-green-500 focus:outline-none",
            error
              ? "border-red-500 focus:border-red-500"
              : "focus:shadow-outline",
            props.disabled
              ? "cursor-not-allowed bg-gray-100 opacity-50"
              : "hover:border-gray-400",
            className,
          )}
          placeholder={placeholder}
          type={inputType}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            className="absolute right-10 top-47 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={handleClickVisible}
            aria-label="Toggle password visibility"
            type="button"
          >
            {isVisible ? (
              <MdOutlineVisibility className="size-25" />
            ) : (
              <MdOutlineVisibilityOff className="size-25" />
            )}
          </button>
        )}
        {error && <p className="mt-1 text-14-400 text-red-400">{error}</p>}
        {isForm && <span className="absolute right-0">{inputSuffix}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
