import { clsx } from "clsx";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼의 스타일 타입을 지정합니다. */
  variant?: "primary" | "secondary" | "outline";
  /** 버튼의 활성화 여부를 지정합니다. */
  isDisabled?: boolean;
  /** 버튼의 내용을 지정합니다. */
  children: ReactNode;
  /** 추가적인 className입니다. */
  className?: string;
}

export default function Button({
  variant = "primary",

  isDisabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-8 font-medium transition-colors focus:outline-none",
        {
          "bg-blue-400 text-white hover:bg-blue-500 ":
            variant === "primary" && !isDisabled,
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary" && !isDisabled,
          "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50":
            variant === "outline" && !isDisabled,
          "opacity-50 cursor-not-allowed bg-neutral-300": isDisabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
