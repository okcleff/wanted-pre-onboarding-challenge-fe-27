import React from "react";
import { twMerge } from "tailwind-merge";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  className = "",
  children,
  type = "button",
  ...props
}) => {
  const mergedClassName = twMerge(
    `w-full py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 transition-colors rounded`,
    className,
  );

  return (
    <button className={mergedClassName} {...props} type={type}>
      {children}
    </button>
  );
};
export default CommonButton;
