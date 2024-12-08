import { ComponentProps, ReactNode } from "react";

import cn from "@/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "outline-gray" | "red";
  isDisabled?: boolean;
  children: ReactNode;
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
      className={cn(
        "inline-flex items-center justify-center rounded-md px-8 transition-colors focus:outline-none",
        {
          "bg-[#0FED60] text-black hover:bg-[#0FED88]":
            variant === "primary" && !isDisabled,
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary" && !isDisabled,
          "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50":
            variant === "outline" && !isDisabled,
          "bg-white text-black border border-[#B6B6B6] hover:bg-[#B6B6B6]/10 !rounded-4 px-24 py-9":
            variant === "outline-gray" && !isDisabled,
          "bg-[#E43851] text-white hover:bg-[#E43851]/95 !rounded-4 px-24 py-9":
            variant === "red" && !isDisabled,
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
