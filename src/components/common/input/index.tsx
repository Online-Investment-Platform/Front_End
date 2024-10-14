"use client";

import { clsx } from "clsx";
import { ComponentProps, forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import { useToggle } from "@/hooks";

interface InputProps extends Omit<ComponentProps<"input">, "type"> {
  /** input의 placeholder 속성입니다. */
  placeholder: string;
  /** input 의 타입입니다. text, email, password */
  type?: "text" | "email" | "password" | "number";
  /** 추가적인 className입니다. 너비와 높이 등을 설정할 수 있습니다. */
  className?: string;
  /** 에러 메시지입니다. */
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", className, error, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const { value: isVisible, handleToggle } = useToggle();

    const handleClickVisible = () => {
      handleToggle();
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password",
      );
    };

    return (
      <div className="relative w-full">
        <input
          className={clsx(
            "w-full rounded-lg px-10 leading-tight text-gray-700",
            "border border-gray-300 bg-white focus:border-blue-500 focus:outline-none",
            "transition-all duration-200 ease-in-out",
            error
              ? "border-red-500 focus:border-red-500"
              : "focus:shadow-outline",
            props.disabled
              ? "cursor-not-allowed bg-gray-100 opacity-50"
              : "hover:border-gray-400",
            className, // 여기에 외부에서 전달된 className을 적용합니다.
          )}
          placeholder={placeholder}
          type={inputType}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer pr-10 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={handleClickVisible}
            aria-label="Toggle password visibility"
            type="button"
          >
            {isVisible ? (
              <MdOutlineVisibility className="mt-15 size-20" />
            ) : (
              <MdOutlineVisibilityOff className="mt-15 size-20" />
            )}
          </button>
        )}
        {error && <p className="mt-3 text-14-400 text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
