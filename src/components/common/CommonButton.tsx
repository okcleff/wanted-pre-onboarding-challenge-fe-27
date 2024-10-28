import React from "react";
import { twMerge } from "tailwind-merge";

type CommonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string; // 필수 속성
};

const CommonButton: React.FC<CommonButtonProps> = ({
  className = "",
  buttonText,
  ...props
}) => {
  const mergedClassName = twMerge(
    `w-full py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 transition-colors rounded`,
    className
  );

  return (
    <button className={mergedClassName} {...props}>
      {buttonText}
    </button>
  );
};
export default CommonButton;
