import { FormValues } from 'interfaces';
import React, { HTMLInputTypeAttribute } from 'react';
import { FieldErrorsImpl, Path, UseFormRegister } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  errorMessage: string | undefined;
}

export const Input = ({
  register,
  name,
  label,
  errorMessage,
  ...rest
}: Props) => {
  return (
    <div className="mb-2">
      <label className="block">
        <span className="text-gray-700 text-sm font-bold">{label}</span>
        <input
          className={`shadow appearance-none border ${
            !!errorMessage ? 'border-red-500' : 'border-gray-600'
          } rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline`}
          {...register(name)}
          {...rest}
        />
      </label>
      <label className="text-red-500 text-xs italic inline-block">
        {errorMessage}
      </label>
    </div>
  );
};
