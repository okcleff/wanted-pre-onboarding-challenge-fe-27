import React from "react";

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
  return (
    <div className="pt-2">
      {labelText && (
        <label
          htmlFor={id}
          className={`text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {labelText}
        </label>
      )}

      <div className="mt-1">
        <input
          id={id}
          className={`w-full h-8 pl-2 border-1 border border-gray-200 rounded-sm ${inputClassName}`}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
export default CommonInput;
