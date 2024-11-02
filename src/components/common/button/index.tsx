import { clsx } from "clsx";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
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
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-8 font-medium transition-colors focus:outline-none",
        {
          "bg-[#0FED60] text-black hover:bg-[#0FED88] ":
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
