import { ReactNode } from "react";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type TSelectProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  options: { value: string | number; label: string }[];
  icon?: ReactNode;
  error?: string;
  placeholder?: string;
  required?: boolean;
};

const Select = <TFieldValues extends FieldValues>({
  label,
  name,
  register,
  options,
  icon,
  error,
  placeholder,
  required = false,
  
}: TSelectProps<TFieldValues>) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-color-text-1" htmlFor={name}>
        {label}:
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={name}
          className={`ps-8 p-2 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none appearance-none ${
            error ? 'border-red-500' : ''
          }`}
          {...register(name)}
          defaultValue=""
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Icon */}
        {icon && (
          <div className="absolute top-1/2 -translate-y-1/2 start-2">{icon}</div>
        )}
        
        {/* Custom dropdown arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 end-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-color-text-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;