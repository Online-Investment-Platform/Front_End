import clsx from "clsx";
import { HTMLAttributes, memo } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.FC<{ className?: string }>;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
}

function IconButtonComponent({
  icon: Icon,
  label,
  isActive = false,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex flex-col items-center justify-center p-2",
        isActive ? "text-zinc-950" : "text-gray-500 hover:text-zinc-900",
        className,
      )}
      {...props}
    >
      <div className="mb-5">
        <Icon className="size-19" />
      </div>
      {label && (
        <span className="items-center justify-center text-14-400">{label}</span>
      )}
    </button>
  );
}

export default memo(IconButtonComponent);
