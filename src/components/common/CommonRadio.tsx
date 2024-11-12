import React from "react";
import { twMerge } from "tailwind-merge";

interface CommonRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  fieldsetClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const CommonRadio: React.FC<CommonRadioProps> = ({
  name,
  options,
  onChange,
  value,
  fieldsetClassName = "",
  labelClassName = "",
  inputClassName = "",
}) => {
  const mergedFieldsetClassName = twMerge(`flex gap-4`, fieldsetClassName);

  const mergedLabelClassName = twMerge(
    `text-sm font-medium text-gray-700`,
    labelClassName,
  );

  const mergedInputClassName = twMerge(``, inputClassName);

  return (
    <fieldset className={mergedFieldsetClassName}>
      {options.map((option) => (
        <label key={option.value} className={mergedLabelClassName}>
          <input
            type="radio"
            value={option.value}
            name={name}
            onChange={onChange}
            checked={value === option.value}
            className={mergedInputClassName}
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};
export default CommonRadio;
