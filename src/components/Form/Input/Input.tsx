import { ReactNode } from "react";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type TInput<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type: string;
  register: UseFormRegister<TFieldValue>;
  icon?: ReactNode;
  error?: string;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  capture?: boolean | 'user' | 'environment';
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type,
  register,
  icon,
  error,
  placeholder,

  ...rest
}: TInput<TFieldValue>) => {
  return (
    <div className="email flex flex-col gap-1.5">
      <label className="text-sm text-color-text-1" htmlFor={name}>{label}:</label>
      <div className="relative">
        <input
          id={name}
          type={type}
          className="ps-8 p-2 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          placeholder={placeholder}
          {...register(name)}
          {...rest}
        />
        {/* icon */}
        <div className="absolute top-1/2 -translate-y-1/2 start-2">{icon}</div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
