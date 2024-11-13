import React from "react";

interface CommonSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
export default CommonSelect;
