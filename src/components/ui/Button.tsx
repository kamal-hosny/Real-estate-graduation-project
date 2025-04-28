import { ButtonHTMLAttributes, forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", ...rest }, ref) => {
    return (
      <button
        className={` py-2 px-4 h-fit w-fit rounded-md text-base font-medium ${className}`}
        ref={ref}
        {...rest}
      ></button>
    );
  }
);

export default Button;
