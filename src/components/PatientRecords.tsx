import React, { useState } from 'react';
import { PatientPrescription, DoctorLetterhead } from '../types/prescription';
import { exportRecordsAsJSON } from '../utils/storage';
import { 
  Search, 
  Printer, 
  Eye, 
  Trash2, 
  Copy, 
  Calendar, 
  User, 
  Phone, 
  CloudDownload, 
  Upload, 
  Filter, 
  HeartPulse, 
  CheckCircle2, 
  ArrowUpDown,
  FileSpreadsheet,
  DownloadCloud
} from 'lucide-react';

interface PatientRecordsProps {
  records: PatientPrescription[];
  letterhead: DoctorLetterhead;
  onViewPrescription: (record: PatientPrescription) => void;
  onEditPrescription: (record: PatientPrescription) => void;
  onDeleteRecord: (id: string) => void;
  onImportRecords: (newRecords: PatientPrescription[]) => void;
  onNewPrescription: () => void;
}

export const PatientRecords: React.FC<PatientRecordsProps> = ({
  records,
  letterhead,
  onViewPrescription,
  onEditPrescription,
  onDeleteRecord,
  onImportRecords,
  onNewPrescription
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Filter records
  const filtered = records.filter((r) => {
    // Search match
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      r.patientName.toLowerCase().includes(term) ||
      r.rxNumber.toLowerCase().includes(term) ||
      (r.contact && r.contact.includes(term)) ||
      (r.diagnosis && r.diagnosis.toLowerCase().includes(term)) ||
      (r.complaints && r.complaints.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    // Date filter
    if (dateFilter === 'today') {
      return r.date === todayStr;
    } else if (dateFilter === 'week') {
      const recTime = new Date(r.date).getTime();
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return recTime >= weekAgo;
    } else if (dateFilter === 'month') {
      const recTime = new Date(r.date).getTime();
      const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      return recTime >= monthAgo;
    }
    return true;
  });

  const todayCount = records.filter((r) => r.date === todayStr).length;

  // Export to CSV for Excel / Google Sheets
  const handleExportCSV = () => {
    if (records.length === 0) return;
    const headers = [
      'Prescription #',
      'Date',
      'Time',
      'Patient Name',
      'Age',
      'Gender',
      'Contact',
      'Diagnosis',
      'Complaints',
      'BP',
      'Pulse',
      'Weight',
      'Medicines Prescribed',
      'Investigations',
      'Advice'
    ];

    const rows = records.map((r) => [
      `"${r.rxNumber}"`,
      `"${r.date}"`,
      `"${r.time}"`,
      `"${r.patientName.replace(/"/g, '""')}"`,
      `"${r.age || ''}"`,
      `"${r.gender}"`,
      `"${r.contact || ''}"`,
      `"${(r.diagnosis || '').replace(/"/g, '""')}"`,
      `"${(r.complaints || '').replace(/"/g, '""')}"`,
      `"${r.bp || ''}"`,
      `"${r.pulse || ''}"`,
      `"${r.weight || ''}"`,
      `"${r.medicines.map((m) => `${m.name} (${m.dosage})`).join('; ')}"`,
      `"${(r.investigations || []).join('; ')}"`,
      `"${(r.advice || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dr_fayyaz_patients_records_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Import JSON backup
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportRecords(parsed);
          alert(`Successfully imported ${parsed.length} patient records!`);
        } else {
          alert('Invalid file format. Please upload a valid JSON patient backup.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Patients */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Treated Patients
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {records.length}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Stored in clinic database</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Patients Today */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Patients Seen Today
            </p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              {todayCount}
            </h3>
            <p className="text-[11px] text-emerald-700/80 mt-0.5">{todayStr}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <HeartPulse className="w-6 h-6" />
          </div>
        </div>

        {/* Google Drive & Cloud Backup Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-2xl border border-amber-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <DownloadCloud className="w-4 h-4 text-amber-700" />
                Google Drive & Cloud Backup
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                Permanent
              </span>
            </div>
            <p className="text-[11px] text-amber-800/90 mt-1 leading-snug">
              Save all patient records to Google Drive or Excel spreadsheet anytime.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => exportRecordsAsJSON(records)}
              className="flex-1 py-1.5 px-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-2xs transition"
              title="Download full JSON file to save to Google Drive"
            >
              <CloudDownload className="w-3.5 h-3.5" />
              Drive JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-2xs transition"
              title="Export to Excel / Google Sheets CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Sheets CSV
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Patient Name, Phone, Rx #, Diagnosis..."
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium shrink-0">
            <button
              onClick={() => setDateFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                dateFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records ({records.length})
            </button>
            <button
              onClick={() => setDateFilter('today')}
              className={`px-3 py-1.5 rounded-lg transition ${
                dateFilter === 'today'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today ({todayCount})
            </button>
            <button
              onClick={() => setDateFilter('week')}
              className={`px-3 py-1.5 rounded-lg transition ${
                dateFilter === 'week'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past 7 Days
            </button>
          </div>

          {/* Import Backup file */}
          <label className="cursor-pointer px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Patient Records List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-3">
            <User className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
            <p className="text-sm font-semibold text-slate-600">No patient records found.</p>
            <p className="text-xs text-slate-400">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first prescription to start building records.'}
            </p>
            <button
              onClick={onNewPrescription}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition"
            >
              + Create New Prescription
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Rx Number</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Patient Details</th>
                  <th className="py-3 px-4">Diagnosis / Case</th>
                  <th className="py-3 px-4">Medicines Prescribed</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* Rx Number */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 block w-max">
                        {record.rxNumber}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{record.date}</div>
                      <div className="text-[10px] text-slate-400">{record.time}</div>
                    </td>

                    {/* Patient Name & Age */}
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-sm text-slate-900">
                        {record.patientName}
                      </div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-2 mt-0.5">
                        <span>{record.age || 'Age N/A'}</span>
                        <span>•</span>
                        <span>{record.gender}</span>
                        {record.contact && (
                          <>
                            <span>•</span>
                            <span className="font-mono">{record.contact}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Diagnosis */}
                    <td className="py-3 px-4 max-w-xs">
                      {record.diagnosis ? (
                        <span className="font-bold text-slate-800 line-clamp-1">
                          {record.diagnosis}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">No diagnosis entered</span>
                      )}
                      {record.bp && (
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          BP: {record.bp} | Pulse: {record.pulse || '—'}
                        </span>
                      )}
                    </td>

                    {/* Medicines Count & Names */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {record.medicines.slice(0, 3).map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium"
                          >
                            {m.name.split(' ')[0]}
                          </span>
                        ))}
                        {record.medicines.length > 3 && (
                          <span className="text-[10px] text-blue-600 font-bold">
                            +{record.medicines.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        
                        {/* View & Print */}
                        <button
                          type="button"
                          onClick={() => onViewPrescription(record)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                          title="View & Print Official Prescription"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Duplicate for follow-up */}
                        <button
                          type="button"
                          onClick={() => onEditPrescription(record)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition"
                          title="Follow-Up / Edit Prescription"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        {/* Delete with confirmation */}
                        {deleteConfirmId === record.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-md border border-rose-200">
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteRecord(record.id);
                                setDeleteConfirmId(null);
                              }}
                              className="text-[10px] font-bold text-rose-700 px-1.5 py-0.5 rounded bg-rose-600 text-white"
                            >
                              Yes, Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-[10px] text-slate-500 hover:text-slate-700 px-1"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(record.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
