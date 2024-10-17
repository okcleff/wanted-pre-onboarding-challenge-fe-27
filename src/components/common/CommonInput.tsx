import React from "react";

interface IInputProps {
  labelText?: string;
  labelClassName?: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  inputClassName?: string;
  errorMessage?: string;
}

const CommonInput: React.FC<IInputProps> = ({
  labelText,
  labelClassName = "",
  id,
  name,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
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
          name={name}
          type={type}
          required={required}
          className={`w-full h-8 pl-2 border-1 border border-gray-200 rounded-sm ${inputClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
