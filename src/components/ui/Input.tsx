import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-neutral-secondary mb-1">
          {label}
        </label>
      }
      <input
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-neutral-text placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:bg-gray-50 ${error ? 'border-coral focus:border-coral focus:ring-coral' : ''} ${className}`}
        {...props} />

      {error && <p className="mt-1 text-sm text-coral">{error}</p>}
    </div>);

}
interface TextAreaProps extends
  React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function TextArea({
  label,
  error,
  className = '',
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-neutral-secondary mb-1">
          {label}
        </label>
      }
      <textarea
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-neutral-text placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:bg-gray-50 ${error ? 'border-coral focus:border-coral focus:ring-coral' : ''} ${className}`}
        {...props} />

      {error && <p className="mt-1 text-sm text-coral">{error}</p>}
    </div>);

}