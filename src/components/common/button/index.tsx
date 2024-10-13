import { clsx } from "clsx";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼의 스타일 타입을 지정합니다. */
  variant: "primary" | "secondary";
  /** 버튼의 활성화 여부를 지정합니다. */
  isDisabled?: boolean; //eslint-disable-line
  /** 버튼의 내용을 지정합니다. */
  children: ReactNode;
}

function Button({
  variant = "primary",
  isDisabled = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={clsx("max-w-440 px-5 py-2", {
        "bg-gray-300 cursor-not-allowed": isDisabled,
        "bg-blue-400 hover:bg-blue-500": variant === "primary" && !isDisabled,
        "bg-red-400 hover:bg-red-500": variant === "secondary" && !isDisabled,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
