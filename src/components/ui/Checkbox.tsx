import React from 'react';
import { Check } from 'lucide-react';
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label
      className={`flex items-start space-x-3 cursor-pointer group ${className}`}>

      <div className="relative flex items-center">
        <input type="checkbox" className="peer sr-only" {...props} />
        <div className="h-5 w-5 rounded border border-gray-300 bg-white peer-checked:bg-teal peer-checked:border-teal transition-colors flex items-center justify-center">
          <Check className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" />
        </div>
      </div>
      <span className="text-sm text-neutral-text group-hover:text-teal transition-colors select-none pt-0.5">
        {label}
      </span>
    </label>);

}