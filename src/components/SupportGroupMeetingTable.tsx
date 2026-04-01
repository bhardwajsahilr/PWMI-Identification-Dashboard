import React, { useState } from 'react';
import { Search, Plus, ArrowUpDown, Eye } from 'lucide-react';
import { SupportGroupMeetingData } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
interface SupportGroupMeetingTableProps {
  records: SupportGroupMeetingData[];
  onSelectRecord: (id: string) => void;
  onNewMeeting: () => void;
}
export function SupportGroupMeetingTable({
  records,
  onSelectRecord,
  onNewMeeting
}: SupportGroupMeetingTableProps) {
  const [search, setSearch] = useState('');
  const filteredRecords = records.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.activityDate.includes(term) ||
      r.facilitatorName.toLowerCase().includes(term) ||
      r.organisationUnit.toLowerCase().includes(term));

  });
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded border border-gray-200 text-sm font-medium text-gray-700 flex-shrink-0">
          <span className="text-gray-500">👥</span>
          4. Support Group Meetings
        </div>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by date, facilitator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal" />
          
        </div>

        <Button
          onClick={onNewMeeting}
          leftIcon={<Plus className="h-4 w-4" />}
          className="flex-shrink-0">
          
          New Support Group Meeting
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Date
                </div>
              </th>
              <th className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Time
                </div>
              </th>
              <th className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Participants (PWMI)
                </div>
              </th>
              <th className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Facilitator
                </div>
              </th>
              <th className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">
                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Status
                </div>
              </th>
              <th className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark text-center">
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
                
                  No support group meetings found.
                </td>
              </tr> :

            filteredRecords.map((record) =>
            <tr
              key={record.id}
              onClick={() => onSelectRecord(record.id)}
              className="bg-white border-b border-gray-100 hover:bg-teal/5 cursor-pointer transition-colors">
              
                  <td className="px-6 py-3 font-medium text-gray-900 border-r border-gray-100">
                    {record.activityDate}
                  </td>
                  <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                    {record.time}
                  </td>
                  <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                    {record.pwmisParticipated}
                  </td>
                  <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                    {record.facilitatorName}
                  </td>
                  <td className="px-6 py-3 border-r border-gray-100">
                    {record.completeEvent ?
                <Badge variant="teal">Completed</Badge> :

                <Badge variant="softPink">Draft</Badge>
                }
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
    </div>);

}