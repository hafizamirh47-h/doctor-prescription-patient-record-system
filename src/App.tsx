import React, { useState, useEffect } from 'react';
import { DoctorLetterhead, PatientPrescription } from './types/prescription';
import { 
  getSavedLetterhead, 
  saveLetterhead, 
  getPrescriptions, 
  savePrescription, 
  deletePrescription,
  savePrescriptions,
  exportRecordsAsJSON
} from './utils/storage';
import { PrescriptionForm } from './components/PrescriptionForm';
import { PatientRecords } from './components/PatientRecords';
import { PrescriptionPrintView } from './components/PrescriptionPrintView';
import { LetterheadEditorModal } from './components/LetterheadEditorModal';
import { 
  FileText, 
  FolderClock, 
  Settings, 
  CloudDownload, 
  PlusCircle, 
  Printer, 
  Stethoscope, 
  CheckCircle2, 
  X,
  Sparkles,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  const [letterhead, setLetterhead] = useState<DoctorLetterhead>(getSavedLetterhead());
  const [records, setRecords] = useState<PatientPrescription[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'records'>('form');
  
  // State for print preview modal
  const [previewPrescription, setPreviewPrescription] = useState<PatientPrescription | null>(null);
  
  // State for editing or duplicating a prescription into the form
  const [editingPrescription, setEditingPrescription] = useState<PatientPrescription | null>(null);
  
  // State for letterhead customization modal
  const [isLetterheadModalOpen, setIsLetterheadModalOpen] = useState(false);
  
  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load records on mount
  useEffect(() => {
    const data = getPrescriptions();
    setRecords(data);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Save letterhead
  const handleSaveLetterhead = (updated: DoctorLetterhead) => {
    setLetterhead(updated);
    saveLetterhead(updated);
    showToast('Doctor letterhead details updated successfully!');
  };

  // Save Prescription (and optionally trigger print view)
  const handleSavePrescription = (prescription: PatientPrescription, andPrint: boolean = false) => {
    const updated = savePrescription(prescription);
    setRecords(updated);
    setEditingPrescription(null);

    if (andPrint) {
      setPreviewPrescription(prescription);
    } else {
      showToast(`Record ${prescription.rxNumber} for "${prescription.patientName}" saved! New form opened.`);
    }
  };

  // Delete Prescription
  const handleDeleteRecord = (id: string) => {
    const updated = deletePrescription(id);
    setRecords(updated);
    showToast('Patient record deleted.');
  };

  // Import Prescriptions from JSON
  const handleImportRecords = (newRecords: PatientPrescription[]) => {
    setRecords(newRecords);
    savePrescriptions(newRecords);
    showToast(`${newRecords.length} records imported successfully!`);
  };

  // Start new prescription
  const handleNewPrescription = () => {
    setEditingPrescription(null);
    setActiveTab('form');
  };

  // Follow-up / edit prescription
  const handleEditPrescription = (record: PatientPrescription) => {
    setEditingPrescription(record);
    setActiveTab('form');
    showToast(`Loaded details for "${record.patientName}" into form.`);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="print:hidden bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Brand & Doctor Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0">
              <span className="text-sm font-serif">Rx</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {letterhead.doctorName || 'Dr Muhammad Fayyaz'}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 hidden sm:inline">
                  Urologist
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Prescription & Patient Record Management System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'form'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>New Prescription</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('records')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition relative ${
                activeTab === 'records'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FolderClock className="w-4 h-4" />
              <span>Patient Records</span>
              {records.length > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {records.length}
                </span>
              )}
            </button>

            {/* Customize Letterhead Button */}
            <button
              type="button"
              onClick={() => setIsLetterheadModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition ml-1"
              title="Edit Doctor Letterhead details, Urdu titles, contact, or paper margin"
            >
              <Settings className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Letterhead Setup</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'form' && (
          <PrescriptionForm
            letterhead={letterhead}
            onOpenLetterheadSettings={() => setIsLetterheadModalOpen(true)}
            onSavePrescription={handleSavePrescription}
            onPreviewPrescription={(draft) => setPreviewPrescription(draft)}
            initialData={editingPrescription}
            onCancelEdit={() => setEditingPrescription(null)}
          />
        )}

        {activeTab === 'records' && (
          <PatientRecords
            records={records}
            letterhead={letterhead}
            onViewPrescription={(record) => setPreviewPrescription(record)}
            onEditPrescription={handleEditPrescription}
            onDeleteRecord={handleDeleteRecord}
            onImportRecords={handleImportRecords}
            onNewPrescription={handleNewPrescription}
          />
        )}
      </main>

      {/* Full Screen Print Preview Modal */}
      {previewPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[96vh] overflow-y-auto rounded-2xl bg-slate-200 p-2 sm:p-4 my-auto">
            <PrescriptionPrintView
              prescription={previewPrescription}
              letterhead={letterhead}
              onClose={() => setPreviewPrescription(null)}
              onPrint={() => window.print()}
            />
          </div>
        </div>
      )}

      {/* Letterhead Customization Modal */}
      <LetterheadEditorModal
        isOpen={isLetterheadModalOpen}
        onClose={() => setIsLetterheadModalOpen(false)}
        letterhead={letterhead}
        onSave={handleSaveLetterhead}
      />
    </div>
  );
}
