import { ChangeEvent } from "react";

type AppTextareaProps = {
  id?: string;
  value: any;
  className?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<any>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  rows?: number;
  caption?: string;
};

export default function AppTextarea({
  id,
  className,
  value,
  label,
  placeholder,
  onChange,
  readOnly,
  disabled,
  rows = 5,
  caption,
}: AppTextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        className={`border-2 w-full p-2 focus:ring-4 rounded-md ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
        autoComplete="off"
      />
      <span className="text-xs text-slate-500 pl-2">{caption}</span>
    </div>
  );
}
