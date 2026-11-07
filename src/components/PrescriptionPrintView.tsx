import React, { useState, useEffect } from 'react';
import { DoctorLetterhead, PatientPrescription } from '../types/prescription';
import { LetterheadHeader, LetterheadFooter } from './LetterheadHeader';
import { KidneyWatermark } from './KidneyWatermark';
import { 
  Printer, 
  X, 
  Sliders, 
  RotateCcw,
  ChevronDown,
  Type
} from 'lucide-react';

interface PrescriptionPrintViewProps {
  prescription: PatientPrescription;
  letterhead: DoctorLetterhead;
  onClose?: () => void;
  onPrint?: () => void;
}

export const PrescriptionPrintView: React.FC<PrescriptionPrintViewProps> = ({
  prescription,
  letterhead,
  onClose,
  onPrint
}) => {
  const [activeMode, setActiveMode] = useState<'original_image' | 'preprinted_pad' | 'vector_digital'>(
    letterhead.letterheadSource || 'original_image'
  );

  // Layout & Font Size adjustments (saved with v3 keys to guarantee fresh calibrated defaults)
  const [fontSizeScale, setFontSizeScale] = useState<'compact' | 'standard' | 'large'>(() => {
    return (localStorage.getItem('dr_rx_font_size_v3') as any) || 'standard';
  });

  // Default 27.5% gives perfect 25px clearance below Dr Fayyaz's Urdu qualifications
  const [topPaddingPercent, setTopPaddingPercent] = useState<number>(() => {
    const saved = localStorage.getItem('dr_rx_top_pad_v3');
    return saved ? parseFloat(saved) : 27.5;
  });

  // Default 15.5% gives perfect 35px clearance above Facebook, YouTube & Appointment phone
  const [bottomPaddingPercent, setBottomPaddingPercent] = useState<number>(() => {
    const saved = localStorage.getItem('dr_rx_bottom_pad_v3');
    return saved ? parseFloat(saved) : 15.5;
  });

  const [showAdjustToolbar, setShowAdjustToolbar] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('dr_rx_font_size_v3', fontSizeScale);
    localStorage.setItem('dr_rx_top_pad_v3', topPaddingPercent.toString());
    localStorage.setItem('dr_rx_bottom_pad_v3', bottomPaddingPercent.toString());
  }, [fontSizeScale, topPaddingPercent, bottomPaddingPercent]);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const resetMarginsToDefault = () => {
    setTopPaddingPercent(27.5);
    setBottomPaddingPercent(15.5);
    setFontSizeScale('standard');
  };

  const isPreprinted = activeMode === 'preprinted_pad';
  const isOriginalImage = activeMode === 'original_image';

  // Dynamic Page Styles
  const pageStyle: React.CSSProperties = isOriginalImage
    ? {
        backgroundImage: `url('/dr-fayyaz-letterhead.jpeg')`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        paddingTop: `${topPaddingPercent}%`,
        paddingBottom: `${bottomPaddingPercent}%`,
        paddingLeft: '5.2%',
        paddingRight: '5.2%'
      }
    : isPreprinted
    ? {
        paddingTop: `${letterhead.topMarginCm || 5.2}cm`,
        paddingBottom: '3.0cm',
        paddingLeft: '1.8cm',
        paddingRight: '1.8cm'
      }
    : {
        padding: '24px 32px'
      };

  // Font sizing styles calibrated for medical clarity
  const fontStyles = {
    compact: {
      patientName: 'text-[12px] font-black text-slate-950',
      patientLabel: 'text-[8px] uppercase font-bold text-slate-500 tracking-wider',
      patientValue: 'text-[10px] font-bold text-slate-900',
      vitals: 'text-[9px] text-slate-700 font-medium',
      sectionHead: 'text-[8.5px] font-black uppercase tracking-wider',
      diagText: 'text-[10.5px] font-bold text-slate-900 leading-snug',
      bodyText: 'text-[9.5px] leading-tight text-slate-800',
      medName: 'text-[11.5px] font-bold text-slate-950',
      medStrength: 'text-[10px] text-slate-600 font-medium',
      medBadge: 'text-[8px] font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700',
      medDosage: 'text-[9px] font-bold text-[#966b1a] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200',
      medInstruction: 'text-[9px] text-slate-700 italic',
      medDuration: 'text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-800'
    },
    standard: {
      patientName: 'text-[13px] font-black text-slate-950',
      patientLabel: 'text-[8.5px] uppercase font-bold text-slate-500 tracking-wider',
      patientValue: 'text-[11px] font-bold text-slate-900',
      vitals: 'text-[9.5px] text-slate-700 font-medium',
      sectionHead: 'text-[9px] font-black uppercase tracking-wider',
      diagText: 'text-[11px] font-extrabold text-slate-950 leading-snug',
      bodyText: 'text-[10px] leading-relaxed text-slate-800',
      medName: 'text-[12.5px] font-bold text-slate-950',
      medStrength: 'text-[10.5px] text-slate-600 font-medium',
      medBadge: 'text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700',
      medDosage: 'text-[10px] font-bold text-[#966b1a] bg-amber-50 px-2 py-0.5 rounded border border-amber-200',
      medInstruction: 'text-[10px] text-slate-700 italic',
      medDuration: 'text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800'
    },
    large: {
      patientName: 'text-[14.5px] font-black text-slate-950',
      patientLabel: 'text-[9.5px] uppercase font-bold text-slate-500 tracking-wider',
      patientValue: 'text-xs font-bold text-slate-900',
      vitals: 'text-[10.5px] text-slate-800 font-medium',
      sectionHead: 'text-[9.5px] font-black uppercase tracking-wider',
      diagText: 'text-[12px] font-black text-slate-950 leading-snug',
      bodyText: 'text-[11px] leading-relaxed text-slate-800',
      medName: 'text-[13.5px] font-black text-slate-950',
      medStrength: 'text-[11px] text-slate-600 font-semibold',
      medBadge: 'text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700',
      medDosage: 'text-[11px] font-bold text-[#966b1a] bg-amber-50 px-2 py-0.5 rounded border border-amber-200',
      medInstruction: 'text-[11px] text-slate-800 italic',
      medDuration: 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800'
    }
  }[fontSizeScale];

  // Clean age string to prevent duplicate "15 Y Y"
  const formattedAge = prescription.age
    ? prescription.age.replace(/y+/gi, '').trim() + ' Y'
    : '—';

  return (
    <div className="relative">
      
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="print:hidden sticky top-2 z-40 mb-3 bg-slate-900/95 text-white p-3 rounded-2xl shadow-2xl flex flex-col gap-2.5 max-w-4xl mx-auto backdrop-blur-md border border-slate-700">
        
        {/* Main Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold">
              Dr Muhammad Fayyaz — Prescription ({prescription.rxNumber})
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Font Size Switcher */}
            <div className="hidden sm:flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs">
              <span className="px-2 text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <Type className="w-3 h-3 text-amber-400" />
                Font:
              </span>
              <button
                type="button"
                onClick={() => setFontSizeScale('compact')}
                className={`px-2 py-1 rounded-lg font-semibold transition ${
                  fontSizeScale === 'compact' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="Small font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeScale('standard')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  fontSizeScale === 'standard' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="Normal standard font size (Recommended)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeScale('large')}
                className={`px-2 py-1 rounded-lg font-semibold transition ${
                  fontSizeScale === 'large' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="Large font size"
              >
                A+
              </button>
            </div>

            {/* Layout Margin Adjuster Dropdown */}
            <button
              type="button"
              onClick={() => setShowAdjustToolbar(!showAdjustToolbar)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                showAdjustToolbar 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="Adjust Font Size and Top/Bottom Margins"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Adjust Margins</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showAdjustToolbar ? 'rotate-180' : ''}`} />
            </button>

            {/* Print Trigger */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 transition active:scale-98"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip (Ctrl+P)</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Expandable Adjuster Drawer: Font Size & Margins */}
        {showAdjustToolbar && (
          <div className="bg-slate-800/95 rounded-xl p-3 border border-slate-700 text-xs space-y-3 animate-in fade-in slide-in-from-top-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* 1. Font Size Chooser */}
              <div>
                <label className="block text-[11px] font-bold text-amber-300 mb-1.5">
                  1. Font Size (فونٹ سائز):
                </label>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setFontSizeScale('compact')}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold transition ${
                      fontSizeScale === 'compact' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    چھوٹا (A-)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeScale('standard')}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold transition ${
                      fontSizeScale === 'standard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    معیاری (A)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeScale('large')}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold transition ${
                      fontSizeScale === 'large' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    بڑا (A+)
                  </button>
                </div>
              </div>

              {/* 2. Top Gap (Prevents overlap with Urdu qualifications) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-amber-300">
                    2. Top Gap (ڈاکٹر اسناد سے فاصلہ):
                  </label>
                  <span className="font-mono text-emerald-400 font-bold">{topPaddingPercent}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTopPaddingPercent((p) => Math.max(22, p - 0.5))}
                    className="w-7 h-7 rounded bg-slate-900 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700"
                    title="Nudge Up"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="22"
                    max="34"
                    step="0.5"
                    value={topPaddingPercent}
                    onChange={(e) => setTopPaddingPercent(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setTopPaddingPercent((p) => Math.min(34, p + 0.5))}
                    className="w-7 h-7 rounded bg-slate-900 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700"
                    title="Nudge Down"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ڈاکٹر صاحب کی اسناد سے مریض کے نام کا فاصلہ
                </span>
              </div>

              {/* 3. Bottom Signature Gap (Prevents overlap with Facebook/YouTube) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-amber-300">
                    3. Signature Gap (فیس بک سے فاصلہ):
                  </label>
                  <span className="font-mono text-emerald-400 font-bold">{bottomPaddingPercent}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBottomPaddingPercent((p) => Math.max(10, p - 0.5))}
                    className="w-7 h-7 rounded bg-slate-900 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700"
                    title="Nudge Down"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="10"
                    max="22"
                    step="0.5"
                    value={bottomPaddingPercent}
                    onChange={(e) => setBottomPaddingPercent(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setBottomPaddingPercent((p) => Math.min(22, p + 0.5))}
                    className="w-7 h-7 rounded bg-slate-900 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700"
                    title="Nudge Up"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  دستخط کا فیس بک و اپائنٹمنٹ لنکس سے اوپر فاصلہ
                </span>
              </div>
            </div>

            {/* Mode selection & Reset */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-700 text-[11px] text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span>Print Mode:</span>
                <button
                  type="button"
                  onClick={() => setActiveMode('original_image')}
                  className={`px-2.5 py-0.5 rounded border transition ${
                    activeMode === 'original_image' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'border-slate-700 text-slate-300'
                  }`}
                >
                  Original Letterhead (As-Is)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('preprinted_pad')}
                  className={`px-2.5 py-0.5 rounded border transition ${
                    activeMode === 'preprinted_pad' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'border-slate-700 text-slate-300'
                  }`}
                >
                  Pre-Printed Pad (Empty Header)
                </button>
              </div>

              <button
                type="button"
                onClick={resetMarginsToDefault}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>
          </div>
        )}
      </div>

      {/* The Printable Prescription Sheet */}
      <div 
        id="printable-prescription"
        className="relative bg-white text-slate-900 w-full max-w-[210mm] mx-auto min-h-[297mm] flex flex-col justify-between shadow-2xl print:shadow-none print:m-0 print:max-w-none print:w-full print:min-h-0 print-sheet"
        style={pageStyle}
      >
        {/* Render Vector Header only if vector mode */}
        {activeMode === 'vector_digital' && (
          <div className="relative z-10 mb-4">
            <LetterheadHeader letterhead={letterhead} />
            <div className="absolute inset-0 pointer-events-none">
              <KidneyWatermark opacity={0.10} />
            </div>
          </div>
        )}

        {/* Content Container (Overlayed safely on the letterhead writable area) */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            
            {/* Patient Information & Vitals Strip - Fully clears Dr Fayyaz's qualifications */}
            <div className="mb-3 p-2 bg-white/95 rounded-lg border border-slate-300/80 shadow-2xs backdrop-blur-xs select-none">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-1 pb-1 border-b border-slate-200">
                <div>
                  <span className={`${fontStyles.patientLabel} block`}>PATIENT NAME:</span>
                  <strong className={`${fontStyles.patientName} block leading-tight`}>{prescription.patientName || 'N/A'}</strong>
                </div>
                <div>
                  <span className={`${fontStyles.patientLabel} block`}>AGE / GENDER:</span>
                  <span className={`${fontStyles.patientValue} block leading-tight`}>
                    {formattedAge} / {prescription.gender}
                  </span>
                </div>
                <div>
                  <span className={`${fontStyles.patientLabel} block`}>PRESCRIPTION #:</span>
                  <span className="font-mono font-bold text-slate-900 text-xs block leading-tight">{prescription.rxNumber}</span>
                </div>
                <div>
                  <span className={`${fontStyles.patientLabel} block`}>DATE & TIME:</span>
                  <span className="font-medium text-slate-800 text-[10px] block leading-tight">{prescription.date} {prescription.time}</span>
                </div>
              </div>

              {/* Vitals row */}
              <div className={`flex flex-wrap items-center gap-x-3 gap-y-0.5 ${fontStyles.vitals}`}>
                {prescription.contact && (
                  <span><strong>Contact:</strong> {prescription.contact}</span>
                )}
                {prescription.weight && (
                  <span><strong>Weight:</strong> {prescription.weight}</span>
                )}
                {prescription.bp && (
                  <span><strong>BP:</strong> {prescription.bp}</span>
                )}
                {prescription.pulse && (
                  <span><strong>Pulse:</strong> {prescription.pulse}</span>
                )}
                {prescription.temp && (
                  <span><strong>Temp:</strong> {prescription.temp}</span>
                )}
                {prescription.spO2 && (
                  <span><strong>SpO2:</strong> {prescription.spO2}</span>
                )}
                {prescription.bloodSugar && (
                  <span><strong>Sugar:</strong> {prescription.bloodSugar}</span>
                )}
              </div>
            </div>

            {/* Main Clinical Prescription Body: 2 Columns */}
            <div className="grid grid-cols-12 gap-3.5 min-h-[460px]">
              
              {/* Left Column (35%): Clinical Assessment, Diagnosis, Investigations, Advice */}
              <div className="col-span-4 border-r border-slate-300/80 pr-2.5 space-y-2.5 bg-white/70 p-1.5 rounded-lg">
                
                {/* Diagnosis */}
                {prescription.diagnosis && (
                  <div className="bg-amber-50/90 p-2 rounded-lg border border-amber-300">
                    <span className={`${fontStyles.sectionHead} text-amber-950 block mb-0.5`}>
                      DIAGNOSIS / CLINICAL ASSESSMENT:
                    </span>
                    <p className={fontStyles.diagText}>
                      {prescription.diagnosis}
                    </p>
                  </div>
                )}

                {/* Complaints */}
                {prescription.complaints && (
                  <div>
                    <span className={`${fontStyles.sectionHead} text-slate-900 block mb-0.5`}>
                      CHIEF COMPLAINTS:
                    </span>
                    <p className={`${fontStyles.bodyText} whitespace-pre-wrap`}>
                      {prescription.complaints}
                    </p>
                  </div>
                )}

                {/* Clinical History */}
                {prescription.clinicalHistory && (
                  <div>
                    <span className={`${fontStyles.sectionHead} text-slate-900 block mb-0.5`}>
                      HISTORY / ALLERGIES:
                    </span>
                    <p className={`${fontStyles.bodyText} whitespace-pre-wrap`}>
                      {prescription.clinicalHistory}
                    </p>
                  </div>
                )}

                {/* Lab Tests */}
                {prescription.investigations && prescription.investigations.length > 0 && (
                  <div className="pt-1.5 border-t border-slate-200">
                    <span className={`${fontStyles.sectionHead} text-slate-950 block mb-1`}>
                      LAB TESTS / INVESTIGATIONS:
                    </span>
                    <ul className={`list-disc list-inside space-y-0.5 ${fontStyles.bodyText}`}>
                      {prescription.investigations.map((test, idx) => (
                        <li key={idx} className="leading-snug">{test}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Advice & Dietary Precautions */}
                {prescription.advice && (
                  <div className="pt-1.5 border-t border-slate-200">
                    <span className={`${fontStyles.sectionHead} text-slate-950 block mb-0.5`}>
                      DOCTOR'S ADVICE:
                    </span>
                    <p className={`${fontStyles.bodyText} whitespace-pre-wrap`}>
                      {prescription.advice}
                    </p>
                  </div>
                )}

                {/* Follow Up */}
                {prescription.followUpDate && (
                  <div className="p-1.5 rounded bg-blue-50/90 border border-blue-200 text-blue-950 text-[10px]">
                    <span className="block font-bold">Follow-Up Visit:</span>
                    {prescription.followUpDate}
                  </div>
                )}
              </div>

              {/* Right Column (65%): ℞ Medicines Table */}
              <div className="col-span-8 pl-1 space-y-2">
                <div className="flex items-center gap-2 mb-1 bg-white/80 px-2 py-0.5 rounded">
                  <span className="text-2xl font-black font-serif italic text-[#b2822a] leading-none">
                    ℞
                  </span>
                  <span className={`${fontStyles.sectionHead} text-slate-800`}>
                    TREATMENT & PRESCRIBED MEDICATIONS
                  </span>
                </div>

                {prescription.medicines.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 text-xs italic bg-white/60 rounded-xl">
                    No medications prescribed for this patient.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {prescription.medicines.map((med, index) => (
                      <div
                        key={med.id || index}
                        className="p-2 rounded-lg border border-slate-200/90 bg-white/95 shadow-2xs"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[10px] font-bold text-slate-400 font-mono">
                              {index + 1}.
                            </span>
                            <div>
                              <span className={fontStyles.medBadge}>
                                {med.form}
                              </span>
                              <span className={fontStyles.medName}>
                                {med.name}
                              </span>
                              {med.strength && (
                                <span className={fontStyles.medStrength}>
                                  &nbsp;({med.strength})
                                </span>
                              )}
                            </div>
                          </div>

                          {med.duration && (
                            <span className={fontStyles.medDuration}>
                              {med.duration}
                            </span>
                          )}
                        </div>

                        {/* Dosage and Instruction */}
                        <div className="mt-1 ml-5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                          <span className={fontStyles.medDosage}>
                            Dosage: {med.dosage}
                          </span>
                          {med.instruction && (
                            <span className={fontStyles.medInstruction}>
                              "{med.instruction}"
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Doctor Signature Block - Elevated with guaranteed 35-40px clearance above Facebook & Appointment footer */}
          <div className="mt-3 pt-2 mb-1 flex justify-between items-end">
            <div className="text-[9px] text-slate-500 max-w-xs bg-white/80 px-2 py-1 rounded">
              <p className="font-medium leading-tight">
                {letterhead.disclaimer || 'Valid for 7 days. Please bring this slip with laboratory reports on follow-up.'}
              </p>
            </div>

            <div className="text-center min-w-[180px] bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
              <div className="h-8 border-b border-slate-400 mb-1 flex items-end justify-center pb-0.5">
                <span className="text-[8px] text-slate-400 italic">Doctor's Signature / Stamp</span>
              </div>
              <strong className="block text-[11px] font-black text-slate-900 leading-tight">
                Dr Muhammad Fayyaz
              </strong>
              <span className="text-[8.5px] text-slate-600 font-semibold block leading-tight">
                Urologist & Robotic Surgeon
              </span>
            </div>
          </div>

          {/* Render Footer only in digital vector mode */}
          {activeMode === 'vector_digital' && (
            <div className="mt-2">
              <LetterheadFooter letterhead={letterhead} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
