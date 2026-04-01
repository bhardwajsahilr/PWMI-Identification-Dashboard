import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'softPink' | 'coral' | 'gray';
  className?: string;
}
export function Badge({
  children,
  variant = 'gray',
  className = ''
}: BadgeProps) {
  const variants = {
    teal: 'bg-teal text-white',
    softPink: 'bg-softPink text-neutral-text',
    coral: 'bg-coral text-white',
    gray: 'bg-gray-100 text-gray-700'
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      
      {children}
    </span>);

}