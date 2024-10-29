import React from "react";
import { twMerge } from "tailwind-merge";

type CommonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelText?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorMessage?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  id,
  labelText,
  labelClassName = "",
  inputClassName = "",
  errorMessage = "",
  ...props
}) => {
  const mergedLabelClassName = twMerge(
    `text-sm font-medium text-gray-700`,
    labelClassName
  );

  const mergedInputClassName = twMerge(
    `w-full px-3 border border-gray-200 rounded-sm`,
    inputClassName
  );

  return (
    <div className="mt-2">
      {labelText && (
        <label htmlFor={id} className={mergedLabelClassName}>
          {labelText}
        </label>
      )}

      <div className={labelText ? "mt-1" : ""}>
        <input id={id} className={mergedInputClassName} {...props} />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
export default CommonInput;
