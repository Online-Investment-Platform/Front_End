"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import * as React from "react";

import cn from "@/utils/cn";

type CheckButtonProps = {
  isChecked: boolean;
  onChange?: React.MouseEventHandler<SVGSVGElement>;
  size?: number;
  isStatic?: boolean;
  className?: string;
};

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1, opacity: 1 },
  unchecked: { pathLength: 0, opacity: 0 },
};

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 2.5 },
  pressed: { scale: 0.95, strokeWidth: 1.5 },
  checked: () => ({
    stroke: "#11E977",
    fill: "#11E977",
  }),
  unchecked: {
    stroke: "#ddd",
    fill: "rgba(163, 230, 53, 0)",
  },
};

export default function CheckButton({
  isChecked,
  onChange,
  size = 22,
  isStatic = false,
  className,
}: CheckButtonProps) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  // Conditional variants based on isStatic
  const getHoverVariant = () => (isStatic ? {} : boxVariants.hover);
  const getPressedVariant = () => (isStatic ? {} : boxVariants.pressed);

  return (
    <motion.svg
      initial={false}
      animate={isChecked ? "checked" : "unchecked"}
      whileHover={getHoverVariant()}
      whileTap={getPressedVariant()}
      width={size}
      height={size}
      onClick={isStatic ? undefined : onChange}
      viewBox="0 0 22 22"
      className={cn(
        "outline-none",
        isStatic ? "cursor-default" : "cursor-pointer",
        className,
      )}
    >
      <motion.path
        d="M 3 6.33333 C 3 4.49238 4.49238 3 6.33333 3 L 15.6667 3 C 17.5076 3 19 4.49238 19 6.33333 L 19 15.6667 C 19 17.5076 17.5076 19 15.6667 19 L 6.33333 19 C 4.49238 19 3 17.5076 3 15.6667 Z"
        strokeWidth="1.5"
        variants={boxVariants}
      />
      <motion.path
        d="M 6.5 11 L 9.5 14 L 15.5 7.5"
        fill="transparent"
        strokeWidth="2"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
        initial={false}
        animate={isChecked ? "checked" : "unchecked"}
      />
    </motion.svg>
  );
}
