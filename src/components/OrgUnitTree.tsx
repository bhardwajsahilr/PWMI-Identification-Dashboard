import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
export function OrgUnitTree() {
  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200 py-3 w-[260px] flex-shrink-0">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4">
        Organisation Unit
      </div>

      <div className="px-2 text-[13px] leading-relaxed select-none">
        {/* India */}
        <div className="flex items-center gap-1 py-0.5 pl-1">
          <ChevronDown className="h-3 w-3 text-gray-500 flex-shrink-0" />
          <span className="font-semibold text-gray-800">India</span>
        </div>

        {/* Andhra Pradesh */}
        <div className="ml-4 border-l border-gray-200">
          <div className="flex items-center gap-1 py-0.5 pl-2">
            <ChevronDown className="h-3 w-3 text-gray-500 flex-shrink-0" />
            <span className="font-semibold text-gray-800">Andhra Pradesh</span>
          </div>

          {/* NTR */}
          <div className="ml-4 border-l border-gray-200">
            <div className="flex items-center gap-1 py-0.5 pl-2">
              <ChevronDown className="h-3 w-3 text-gray-500 flex-shrink-0" />
              <span className="font-medium text-gray-800">NTR</span>
            </div>

            {/* NTR children */}
            <div className="ml-4 border-l border-gray-200">
              {/* Atlapragada Konduru — expanded */}
              <div className="flex items-center gap-1 py-0.5 pl-2">
                <ChevronDown className="h-3 w-3 text-gray-500 flex-shrink-0" />
                <span className="font-medium text-gray-700">
                  Atlapragada Konduru
                </span>
              </div>

              {/* Atlapragada Konduru children (leaf villages) */}
              <div className="ml-4 border-l border-gray-200">
                {[
                {
                  name: 'A.Konduru',
                  active: true
                },
                {
                  name: 'Atlapragada',
                  active: false
                },
                {
                  name: 'Cheemalapadu',
                  active: false
                },
                {
                  name: 'Gollamandala',
                  active: false
                },
                {
                  name: 'Kambampadu',
                  active: false
                },
                {
                  name: 'Koduru',
                  active: false
                },
                {
                  name: 'Krishnaraopalem',
                  active: false
                },
                {
                  name: 'Kummarakuntla',
                  active: false
                },
                {
                  name: 'Madhavaram (East)',
                  active: false
                },
                {
                  name: 'Madhavaram (West)',
                  active: false
                },
                {
                  name: 'Marepalle',
                  active: false
                },
                {
                  name: 'Polisettipadu',
                  active: false
                },
                {
                  name: 'Repudi',
                  active: false
                },
                {
                  name: 'Vallampatla',
                  active: false
                }].
                map((village) =>
                <div
                  key={village.name}
                  className={`flex items-center gap-1.5 py-0.5 pl-3 ${village.active ? 'text-orange-600 font-bold bg-orange-50 rounded mx-1' : 'text-gray-600'}`}>

                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span>{village.name}</span>
                  </div>
                )}
              </div>

              {/* Chandarlapadu — collapsed */}
              <div className="flex items-center gap-1 py-0.5 pl-2 text-gray-700">
                <Plus className="h-3 w-3 text-gray-500 flex-shrink-0" />
                <span className="font-medium">Chandarlapadu</span>
              </div>

              {/* Gaddamanugu Konduru — collapsed */}
              <div className="flex items-center gap-1 py-0.5 pl-2 text-gray-700">
                <Plus className="h-3 w-3 text-gray-500 flex-shrink-0" />
                <span className="font-medium">Gaddamanugu Konduru</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}