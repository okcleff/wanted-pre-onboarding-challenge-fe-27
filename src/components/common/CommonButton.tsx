import React from "react";

type CommonButtonProps = {
  className?: string;
  buttonText: string;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  className = "",
  buttonText,
  ...props
}) => {
  return (
    <button
      className={`w-full py-2 mt-8 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 ${className}`}
      {...props}
    >
      {buttonText}
    </button>
  );
};
export default CommonButton;
