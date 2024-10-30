import React from "react";
import { twMerge } from "tailwind-merge";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorMessage?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  id,
  labelText,
  wrapperClassName = "",
  labelClassName = "",
  inputClassName = "",
  errorMessage = "",
  ...props
}) => {
  const mergedWrapperClassName = twMerge(`relative mt-2`, wrapperClassName);

  const mergedLabelClassName = twMerge(
    `text-sm font-medium text-gray-700`,
    labelClassName
  );

  const mergedInputClassName = twMerge(
    `w-full px-3 border border-gray-200 rounded-sm`,
    inputClassName
  );

  return (
    <div className={mergedWrapperClassName}>
      {labelText && (
        <label htmlFor={id} className={mergedLabelClassName}>
          {labelText}
        </label>
      )}

      <div className={labelText ? "mt-1" : ""}>
        <input id={id} className={mergedInputClassName} {...props} />
        {errorMessage && (
          <p className="absolute mt-1 text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
export default CommonInput;
