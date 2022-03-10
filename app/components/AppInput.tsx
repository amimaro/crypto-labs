import { ChangeEvent } from "react";

type AppInputProps = {
  id?: string;
  value: any;
  type?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<any>) => void;
  readOnly?: boolean;
  disabled?: boolean;
};

export default function AppInput({
  id,
  className,
  value,
  type,
  label,
  placeholder,
  onChange,
  readOnly,
  disabled,
}: AppInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        className={`border-2 w-full p-2 focus:ring-4 rounded-md ${className}`}
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}
