import React from "react";

type CommonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string; // 필수 속성
};

const CommonButton: React.FC<CommonButtonProps> = ({
  className = "",
  buttonText,
  ...props
}) => {
  return (
    <button
      className={`w-full py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 transition-colors ${className}`}
      {...props}
    >
      {buttonText}
    </button>
  );
};
export default CommonButton;
