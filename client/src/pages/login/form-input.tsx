import { twMerge } from 'tailwind-merge';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ placeholder, error, className, ...props }, ref) => {
    const hasError = !!error;

    return (
      <input
        ref={ref}
        aria-invalid={hasError}
        placeholder={error ?? placeholder}
        className={twMerge(
          `w-full pr-10 rounded-md bg-[#2a3942] text-base text-white px-4 py-3 border placeholder:text-sm focus:outline-none caret-emerald-500`,
          `border-[#3b4a54] placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-500`,
          hasError &&
            '[&:not(:focus):placeholder-shown]:border-red-500 [&:not(:focus):placeholder-shown]:placeholder:text-red-400',
          className,
        )}
        {...props}
      />
    );
  },
);
