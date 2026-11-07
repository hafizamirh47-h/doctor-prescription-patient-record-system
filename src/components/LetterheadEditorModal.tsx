import React, { useState } from 'react';
import { DoctorLetterhead } from '../types/prescription';
import { 
  Building2, 
  User, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  Palette, 
  FileText, 
  X, 
  Check, 
  Sparkles, 
  Copy,
  Printer
} from 'lucide-react';

interface LetterheadEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterhead: DoctorLetterhead;
  onSave: (updated: DoctorLetterhead) => void;
}

export const LetterheadEditorModal: React.FC<LetterheadEditorModalProps> = ({
  isOpen,
  onClose,
  letterhead,
  onSave
}) => {
  const [formData, setFormData] = useState<DoctorLetterhead>({ ...letterhead });
  const [quickPasteText, setQuickPasteText] = useState('');
  const [showQuickPaste, setShowQuickPaste] = useState(false);
  const [activeTab, setActiveTab] = useState<'fields' | 'quick_paste' | 'paper_mode'>('fields');

  if (!isOpen) return null;

  const handleChange = (field: keyof DoctorLetterhead, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyQuickPaste = () => {
    if (!quickPasteText.trim()) return;
    const lines = quickPasteText.split('\n').map((l) => l.trim()).filter(Boolean);
    const updated = { ...formData };

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      if (lower.startsWith('dr') || lower.startsWith('doctor') || lower.includes('dr.')) {
        updated.doctorName = line;
      } else if (lower.includes('mbbs') || lower.includes('fcps') || lower.includes('mrcp') || lower.includes('md') || lower.includes('degree')) {
        updated.qualifications = line;
      } else if (lower.includes('specialist') || lower.includes('physician') || lower.includes('surgeon') || lower.includes('pediatrician') || lower.includes('cardiologist')) {
        updated.specialty = line;
      } else if (lower.includes('pmdc') || lower.includes('pmc') || lower.includes('reg') || lower.includes('license')) {
        updated.regNumber = line;
      } else if (lower.includes('hospital') || lower.includes('clinic') || lower.includes('medical') || lower.includes('center') || lower.includes('centre')) {
        updated.hospitalOrClinic = line;
      } else if (lower.includes('timing') || lower.includes('pm') || lower.includes('am') || lower.includes('daily')) {
        updated.timings = line;
      } else if (lower.includes('03') || lower.includes('+92') || lower.includes('phone') || lower.includes('tel') || lower.includes('cell')) {
        updated.phone = line;
      } else if (lower.includes('road') || lower.includes('street') || lower.includes('plaza') || lower.includes('sector') || lower.includes('block') || lower.includes('city') || lower.includes('lahore') || lower.includes('karachi') || lower.includes('islamabad')) {
        updated.address = line;
      }
    });

    setFormData(updated);
    setShowQuickPaste(false);
    setActiveTab('fields');
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const colorThemes: { id: DoctorLetterhead['themeColor']; label: string; bg: string; border: string; text: string }[] = [
    { id: 'blue', label: 'Classic Blue', bg: 'bg-blue-600', border: 'border-blue-600', text: 'text-blue-600' },
    { id: 'emerald', label: 'Hospital Emerald', bg: 'bg-emerald-600', border: 'border-emerald-600', text: 'text-emerald-600' },
    { id: 'teal', label: 'Clinical Teal', bg: 'bg-teal-600', border: 'border-teal-600', text: 'text-teal-600' },
    { id: 'indigo', label: 'Royal Indigo', bg: 'bg-indigo-600', border: 'border-indigo-600', text: 'text-indigo-600' },
    { id: 'crimson', label: 'Medical Crimson', bg: 'bg-rose-700', border: 'border-rose-700', text: 'text-rose-700' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Doctor & Clinic Letterhead Settings</h2>
              <p className="text-xs text-slate-300">
                Customize your official letterhead, qualifications, timings, and print style
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('fields')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition ${
              activeTab === 'fields'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Letterhead Details
          </button>
          <button
            onClick={() => setActiveTab('quick_paste')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition ${
              activeTab === 'quick_paste'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Paste / Copy Letterhead Text
          </button>
          <button
            onClick={() => setActiveTab('paper_mode')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition ${
              activeTab === 'paper_mode'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            Paper & Print Margin Mode
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'quick_paste' && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-amber-900">
                    Quick Paste: Paste Your Doctor Letterhead Text Here
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Agar aap ke paas letterhead ka text / details hain to yahan paste karein. System Doctor Name, MBBS/Degrees, Clinic Name, Address aur Phone ko pehchan kar form me set kar dega.
                  </p>
                </div>
              </div>
              <textarea
                value={quickPasteText}
                onChange={(e) => setQuickPasteText(e.target.value)}
                placeholder="Example:
Dr. Muhammad Amir Khan
MBBS, FCPS Medicine
AL-SHIFA MEDICAL CLINIC
Suite # 4, Doctors Plaza, Lahore
PMDC Reg # 48291-P
Timing: Daily 5:00 PM to 10:00 PM
Phone: 0300-1234567"
                rows={7}
                className="w-full text-sm font-mono p-3 bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleApplyQuickPaste}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
                >
                  <Check className="w-4 h-4" />
                  Auto-Fill Letterhead From Text
                </button>
              </div>
            </div>
          )}

          {activeTab === 'paper_mode' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-bold text-slate-800">Print Paper Selection</h4>
                <p className="text-xs text-slate-600">
                  Do you print on blank white A4 paper, or do you already have physical printed clinic letterhead pads?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <label
                    onClick={() => {
                      handleChange('paperMode', 'full_letterhead');
                      handleChange('letterheadSource', 'original_image');
                    }}
                    className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col justify-between transition ${
                      formData.letterheadSource === 'original_image'
                        ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-slate-900">Original Letterhead (As-Is)</span>
                        {formData.letterheadSource === 'original_image' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">Active</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Uses Dr Muhammad Fayyaz's exact authentic letterhead design, SIUT logo, Huwa Al-Shafi, and Kidney watermark.
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] font-semibold text-amber-700">Recommended (Exact Replica)</div>
                  </label>

                  <label
                    onClick={() => {
                      handleChange('paperMode', 'full_letterhead');
                      handleChange('letterheadSource', 'vector_digital');
                    }}
                    className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col justify-between transition ${
                      formData.letterheadSource === 'vector_digital'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-slate-900">Digital Vector Mode</span>
                        {formData.letterheadSource === 'vector_digital' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Active</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Clean vector typography with custom headers on plain white paper.
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] font-medium text-blue-600">Standard crisp text</div>
                  </label>

                  <label
                    onClick={() => {
                      handleChange('paperMode', 'blank_top_preprinted');
                      handleChange('letterheadSource', 'preprinted_pad');
                    }}
                    className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col justify-between transition ${
                      formData.paperMode === 'blank_top_preprinted'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-slate-900">Pre-Printed Pad</span>
                        {formData.paperMode === 'blank_top_preprinted' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Active</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Blank space at the top so you can feed your physical printed pad into the printer.
                      </p>
                    </div>
                    <div className="mt-2">
                      <label className="text-[10px] font-semibold text-slate-700 block mb-0.5">Top Gap (cm):</label>
                      <input
                        type="number"
                        step="0.5"
                        min="2"
                        max="10"
                        value={formData.topMarginCm || 5.0}
                        onChange={(e) => handleChange('topMarginCm', parseFloat(e.target.value) || 5.0)}
                        className="w-20 text-[11px] px-2 py-1 border border-slate-300 rounded bg-white"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Color Theme Selector */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-slate-700" />
                  <h4 className="text-sm font-bold text-slate-800">Letterhead Color Theme</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colorThemes.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleChange('themeColor', c.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition ${
                        formData.themeColor === c.id
                          ? 'border-slate-900 bg-white shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${c.bg}`} />
                      {c.label}
                      {formData.themeColor === c.id && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fields' && (
            <div className="space-y-5">
              {/* Doctor Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-800">Doctor Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Doctor Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.doctorName}
                      onChange={(e) => handleChange('doctorName', e.target.value)}
                      placeholder="e.g. Dr. Muhammad Amir Khan"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Degrees & Qualifications *
                    </label>
                    <input
                      type="text"
                      value={formData.qualifications}
                      onChange={(e) => handleChange('qualifications', e.target.value)}
                      placeholder="e.g. M.B.B.S, F.C.P.S, M.R.C.P"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specialty / Designation *
                    </label>
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => handleChange('specialty', e.target.value)}
                      placeholder="e.g. Consultant Physician & General Specialist"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Medical Registration / PMDC / PMC #
                    </label>
                    <input
                      type="text"
                      value={formData.regNumber}
                      onChange={(e) => handleChange('regNumber', e.target.value)}
                      placeholder="e.g. PMDC Reg # 48291-P"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Clinic / Hospital Details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-800">Clinic / Hospital Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Clinic / Hospital Name *
                    </label>
                    <input
                      type="text"
                      value={formData.hospitalOrClinic}
                      onChange={(e) => handleChange('hospitalOrClinic', e.target.value)}
                      placeholder="e.g. AL-SHIFA MEDICAL CLINIC & DIAGNOSTIC"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Clinic Slogan / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => handleChange('tagline', e.target.value)}
                      placeholder="e.g. Compassionate Care, Modern Medical Science"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City & Area
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="e.g. Lahore, Pakistan"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Clinic Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="e.g. Suite # 4, Doctors Plaza, Main Boulevard, Lahore"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Timings */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-800">Contact & Clinic Timings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Clinic Phone / Mobile *
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="e.g. 0300-1234567 / 042-35891234"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Emergency / WhatsApp #
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                      placeholder="e.g. +92 321 9876543"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Clinic Timings *
                    </label>
                    <input
                      type="text"
                      value={formData.timings}
                      onChange={(e) => handleChange('timings', e.target.value)}
                      placeholder="e.g. Daily: 5:00 PM to 10:00 PM"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Off Days / Holidays
                    </label>
                    <input
                      type="text"
                      value={formData.offDays}
                      onChange={(e) => handleChange('offDays', e.target.value)}
                      placeholder="e.g. Sunday Closed"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prescription Footer Note / Disclaimer
                    </label>
                    <input
                      type="text"
                      value={formData.disclaimer}
                      onChange={(e) => handleChange('disclaimer', e.target.value)}
                      placeholder="e.g. Valid for 7 days. Bring prescription on follow-up visit."
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Live Letterhead Header Preview
                </span>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 shadow-inner">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b-2 border-slate-800 gap-2">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                        {formData.doctorName || 'Dr. Doctor Name'}
                      </h4>
                      <p className="text-xs font-semibold text-blue-700">
                        {formData.qualifications || 'M.B.B.S, F.C.P.S'}
                      </p>
                      <p className="text-xs text-slate-600">
                        {formData.specialty || 'Consultant Physician'}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {formData.regNumber || 'PMDC Reg #'}
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <h4 className="text-sm font-extrabold text-slate-900 uppercase">
                        {formData.hospitalOrClinic || 'CLINIC NAME'}
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        {formData.address}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-700">
                        Ph: {formData.phone}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Timing: {formData.timings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition"
            >
              <Check className="w-4 h-4" />
              Save Letterhead Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
