import React, { type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  error, 
  required,
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;