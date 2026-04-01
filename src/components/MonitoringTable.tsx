import React, { useState } from 'react';
import { Search, Plus, ArrowUpDown, Eye } from 'lucide-react';
import { MonthlyMonitoringData } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
interface MonitoringTableProps {
  records: MonthlyMonitoringData[];
  onSelectRecord: (id: string) => void;
  onNewMonitoring: () => void;
}
export function MonitoringTable({
  records,
  onSelectRecord,
  onNewMonitoring
}: MonitoringTableProps) {
  const [search, setSearch] = useState('');
  const filteredRecords = records.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.monitoringMonth.toLowerCase().includes(term) ||
      r.blockSupervisorName.toLowerCase().includes(term) ||
      r.fieldCoordinatorName.toLowerCase().includes(term) ||
      r.overallRating.toLowerCase().includes(term));

  });
  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Good':
        return <Badge variant="teal">Good</Badge>;
      case 'Needs Improvement':
        return <Badge variant="softPink">Needs Improvement</Badge>;
      case 'Critical':
        return <Badge variant="coral">Critical</Badge>;
      default:
        return <Badge variant="gray">{rating || '-'}</Badge>;
    }
  };
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded border border-gray-200 text-sm font-medium text-gray-700 flex-shrink-0">
          <span className="text-gray-500">📋</span>
          3. Monthly Monitoring
        </div>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by month, supervisor, coordinator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal" />
          
        </div>

        <Button
          onClick={onNewMonitoring}
          leftIcon={<Plus className="h-4 w-4" />}
          className="flex-shrink-0">
          
          New Monitoring
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Monitoring Date
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Month
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Block Supervisor
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Field Coordinator
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Overall Rating
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark text-center">
                
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ?
            <tr>
                <td
                colSpan={6}
                className="px-6 py-10 text-center text-gray-500">
                
                  No monitoring records found.
                </td>
              </tr> :

            filteredRecords.map((record) =>
            <tr
              key={record.id}
              onClick={() => onSelectRecord(record.id)}
              className="bg-white border-b border-gray-100 hover:bg-teal/5 cursor-pointer transition-colors">
              
                  <td className="px-6 py-3 font-medium text-gray-900 border-r border-gray-100">
                    {record.monitoringDate}
                  </td>
                  <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                    {record.monitoringMonth}
                  </td>
                  <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                    {record.blockSupervisorName}
                  </td>
                  <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                    {record.fieldCoordinatorName}
                  </td>
                  <td className="px-6 py-3 border-r border-gray-100">
                    {getRatingBadge(record.overallRating)}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRecord(record.id);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-teal hover:text-teal-dark transition-colors">
                  
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
            )
            }
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-600">
        <div className="text-gray-500">{filteredRecords.length} record(s)</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Number of rows per page:</span>
            <select className="border border-gray-300 rounded px-1 py-0.5 bg-white">
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex gap-1">
            <button className="px-1 hover:text-black">«</button>
            <button className="px-1 hover:text-black">‹</button>
            <span className="font-medium text-black">1</span>
            <button className="px-1 hover:text-black">›</button>
            <button className="px-1 hover:text-black">»</button>
          </div>
        </div>
      </div>
    </div>);

}