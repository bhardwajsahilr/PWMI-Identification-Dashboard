import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accent?: 'left' | 'top' | 'none';
  accentColor?: 'softPink' | 'teal' | 'coral';
}
export function Card({
  children,
  className = '',
  onClick,
  accent = 'none',
  accentColor = 'softPink'
}: CardProps) {
  const accentStyles = {
    left: `border-l-4`,
    top: `border-t-4`,
    none: ''
  };
  const colorStyles = {
    softPink: 'border-softPink',
    teal: 'border-teal',
    coral: 'border-coral'
  };
  const combinedAccent =
  accent !== 'none' ?
  `${accentStyles[accent]} ${colorStyles[accentColor]}` :
  '';
  return (
    <div
      className={`bg-white rounded-lg shadow-soft ${combinedAccent} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}>

      {children}
    </div>);

}