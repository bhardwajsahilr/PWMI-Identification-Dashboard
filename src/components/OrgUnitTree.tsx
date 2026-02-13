import React, { useState, Children } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
interface TreeNodeProps {
  label: string;
  children?: React.ReactNode;
  isActive?: boolean;
  defaultExpanded?: boolean;
  level?: number;
}
function TreeNode({
  label,
  children,
  isActive = false,
  defaultExpanded = true,
  level = 0
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = Children.count(children) > 0;
  return (
    <div>
      <div
        className={`flex items-center py-1.5 cursor-pointer rounded-md px-2 mx-1 transition-colors
          ${isActive ? 'text-coral font-bold bg-coral/5' : 'text-gray-700 hover:bg-gray-50'}
        `}
        style={{
          paddingLeft: `${level * 16 + 8}px`
        }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}>

        {/* Expand/Collapse Icon */}
        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mr-1">
          {hasChildren ?
          isExpanded ?
          <ChevronDown className="h-3.5 w-3.5 text-gray-500" /> :

          <ChevronRight className="h-3.5 w-3.5 text-gray-500" /> :


          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block"></span>
          }
        </span>

        {/* Label */}
        <span
          className={`whitespace-nowrap ${level <= 1 ? 'text-sm font-semibold' : level <= 2 ? 'text-sm font-medium' : 'text-sm'}`}>

          {label}
        </span>
      </div>

      {/* Children with connector line */}
      {isExpanded && hasChildren &&
      <div className="relative">
          <div
          className="absolute top-0 bottom-0 border-l border-gray-200"
          style={{
            left: `${level * 16 + 18}px`
          }}>
        </div>
          {children}
        </div>
      }
    </div>);

}
export function OrgUnitTree() {
  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200 py-3 w-[280px] flex-shrink-0">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4">
        Organization Unit
      </div>

      <TreeNode label="India" level={0}>
        <TreeNode label="Karnataka" level={1}>
          <TreeNode label="Mysuru District" level={2}>
            <TreeNode label="Mysuru Block" level={3}>
              <TreeNode label="Mysuru" isActive={true} level={4} />
              <TreeNode label="Mangaluru" level={4} />
              <TreeNode label="Udupi" level={4} />
              <TreeNode label="Belagavi" level={4} />
              <TreeNode label="Dharwad" level={4} />
              <TreeNode label="Hubballi" level={4} />
              <TreeNode label="Hassan" level={4} />
            </TreeNode>
          </TreeNode>
        </TreeNode>
      </TreeNode>
    </div>);

}