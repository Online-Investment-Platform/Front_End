"use client";

import { clsx } from "clsx";
import { ComponentProps, forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import { useToggle } from "@/hooks";

interface InputProps extends Omit<ComponentProps<"input">, "type"> {
  /** input의 placeholder 속성입니다. */
  placeholder: string;
  /** input 의 타입입니다. text, email, password */
  type?: "text" | "email" | "password";
  /** 추가적인 className입니다. 너비와 높이 등을 설정할 수 있습니다. */
  className?: string;
  /** 에러 메시지입니다. */
  error?: string;
  /** 인풋의 높이입니다. 기본값은 '48px'입니다. */
  height?: string;
  /** 인풋의 너비입니다. 기본값은 '100%'입니다. */
  width?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      type = "text",
      className,
      error,
      height = "48px",
      width = "100%",
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

    // 아이콘 크기 계산 (인풋 높이의 약 절반)
    const iconSize = parseInt(height, 10) / 3;

    return (
      <div className={clsx("relative")} style={{ width }}>
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
            className,
          )}
          style={{ height, width }}
          placeholder={placeholder}
          type={inputType}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            className="absolute right-3 top-1/2 mr-8 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={handleClickVisible}
            aria-label="Toggle password visibility"
            type="button"
            style={{ height: `${iconSize}px`, width: `${iconSize}px` }}
          >
            {isVisible ? (
              <MdOutlineVisibility size={iconSize} />
            ) : (
              <MdOutlineVisibilityOff size={iconSize} />
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
