import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  icon?: React.ReactNode;
}
export function Accordion({
  title,
  children,
  defaultOpen = true,
  className = '',
  icon
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-sm border border-gray-100 ${className}`}>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-teal text-white hover:bg-teal-dark transition-colors text-left">
        
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-lg">{title}</span>
        </div>
        {isOpen ?
        <ChevronUp className="h-5 w-5" /> :

        <ChevronDown className="h-5 w-5" />
        }
      </button>

      <div
        className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        
        <div className="p-6 border-t border-gray-100">{children}</div>
      </div>
    </div>);

}