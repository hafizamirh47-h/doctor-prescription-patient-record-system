import React, { useState, useEffect } from 'react';
import { 
  DoctorLetterhead, 
  PatientPrescription, 
  MedicineItem 
} from '../types/prescription';
import { 
  COMMON_MEDICINES, 
  COMMON_INVESTIGATIONS, 
  COMMON_DIAGNOSES, 
  DOSAGE_PRESETS, 
  INSTRUCTION_PRESETS 
} from '../data/defaultData';
import { getNextRxNumber } from '../utils/storage';
import { 
  Plus, 
  Trash2, 
  Printer, 
  RotateCcw, 
  Save, 
  UserPlus, 
  Settings, 
  CheckCircle2, 
  HeartPulse, 
  FileCheck, 
  Sparkles,
  Calendar,
  Clock,
  Pill,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

interface PrescriptionFormProps {
  letterhead: DoctorLetterhead;
  onOpenLetterheadSettings: () => void;
  onSavePrescription: (prescription: PatientPrescription, andPrint?: boolean) => void;
  onPreviewPrescription?: (prescription: PatientPrescription) => void;
  initialData?: PatientPrescription | null;
  onCancelEdit?: () => void;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  letterhead,
  onOpenLetterheadSettings,
  onSavePrescription,
  onPreviewPrescription,
  initialData,
  onCancelEdit
}) => {
  // Form State
  const [rxNumber, setRxNumber] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  // Patient info
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Child' | 'Other'>('Male');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  // Vitals
  const [weight, setWeight] = useState('');
  const [bp, setBp] = useState('');
  const [pulse, setPulse] = useState('');
  const [temp, setTemp] = useState('');
  const [spO2, setSpO2] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');

  // Clinical
  const [complaints, setComplaints] = useState('');
  const [clinicalHistory, setClinicalHistory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  // Medicines
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [medName, setMedName] = useState('');
  const [medForm, setMedForm] = useState<MedicineItem['form']>('Tablet');
  const [medStrength, setMedStrength] = useState('');
  const [medDosage, setMedDosage] = useState('1-0-1');
  const [medDuration, setMedDuration] = useState('5 days');
  const [medInstruction, setMedInstruction] = useState('After meals (Khane ke baad)');

  // Investigations & Advice
  const [investigations, setInvestigations] = useState<string[]>([]);
  const [customTest, setCustomTest] = useState('');
  const [advice, setAdvice] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // UI feedback
  const [submittedAlert, setSubmittedAlert] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);

  // Initialize or reset form
  const resetToNewPatientForm = () => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRxNumber(getNextRxNumber());
    setDate(formattedDate);
    setTime(formattedTime);
    setPatientName('');
    setAge('');
    setGender('Male');
    setContact('');
    setAddress('');
    setWeight('');
    setBp('');
    setPulse('');
    setTemp('98.6 °F');
    setSpO2('98%');
    setBloodSugar('');
    setComplaints('');
    setClinicalHistory('');
    setDiagnosis('');
    setMedicines([]);
    setInvestigations([]);
    setCustomTest('');
    setAdvice('Plenty of fluids and rest. Avoid spicy & oily foods.');
    setFollowUpDate('');
    setNameError(false);

    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (initialData) {
      setRxNumber(initialData.rxNumber);
      setDate(initialData.date);
      setTime(initialData.time);
      setPatientName(initialData.patientName);
      setAge(initialData.age);
      setGender(initialData.gender);
      setContact(initialData.contact);
      setAddress(initialData.address || '');
      setWeight(initialData.weight || '');
      setBp(initialData.bp || '');
      setPulse(initialData.pulse || '');
      setTemp(initialData.temp || '');
      setSpO2(initialData.spO2 || '');
      setBloodSugar(initialData.bloodSugar || '');
      setComplaints(initialData.complaints || '');
      setClinicalHistory(initialData.clinicalHistory || '');
      setDiagnosis(initialData.diagnosis || '');
      setMedicines(initialData.medicines || []);
      setInvestigations(initialData.investigations || []);
      setAdvice(initialData.advice || '');
      setFollowUpDate(initialData.followUpDate || '');
    } else {
      resetToNewPatientForm();
    }
  }, [initialData]);

  // Handle Medicine quick search selection
  const handleSelectPredefinedMedicine = (med: (typeof COMMON_MEDICINES)[0]) => {
    setMedName(med.name);
    setMedForm(med.form);
    setMedStrength(med.strength);
    setMedDosage(med.defaultDosage);
    setMedInstruction(med.instruction);
  };

  const handleAddMedicine = () => {
    if (!medName.trim()) return;

    const newMed: MedicineItem = {
      id: `med-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: medName.trim(),
      form: medForm,
      strength: medStrength.trim(),
      dosage: medDosage.trim(),
      duration: medDuration.trim(),
      instruction: medInstruction.trim()
    };

    setMedicines((prev) => [...prev, newMed]);
    // Reset medicine input fields
    setMedName('');
    setMedStrength('');
    setMedDosage('1-0-1');
    setMedDuration('5 days');
    setMedInstruction('After meals (Khane ke baad)');
  };

  const handleRemoveMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const handleToggleTest = (test: string) => {
    setInvestigations((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  };

  const handleAddCustomTest = () => {
    if (!customTest.trim()) return;
    if (!investigations.includes(customTest.trim())) {
      setInvestigations((prev) => [...prev, customTest.trim()]);
    }
    setCustomTest('');
  };

  // Submit Handler: Saves record and instantly opens fresh new form
  const handleFormSubmit = (andPrint: boolean = false) => {
    if (!patientName.trim()) {
      setNameError(true);
      const element = document.getElementById('patient-name-input');
      element?.focus();
      return;
    }

    const cleanedAge = age.replace(/y+/gi, '').trim();

    const record: PatientPrescription = {
      id: initialData?.id || `rx-${Date.now()}`,
      rxNumber: rxNumber || getNextRxNumber(),
      date,
      time,
      patientName: patientName.trim(),
      age: cleanedAge ? `${cleanedAge} Y` : '',
      gender,
      contact: contact.trim(),
      address: address.trim(),
      weight: weight.trim(),
      bp: bp.trim(),
      pulse: pulse.trim(),
      temp: temp.trim(),
      spO2: spO2.trim(),
      bloodSugar: bloodSugar.trim(),
      complaints: complaints.trim(),
      clinicalHistory: clinicalHistory.trim(),
      diagnosis: diagnosis.trim(),
      medicines,
      investigations,
      advice: advice.trim(),
      followUpDate: followUpDate.trim(),
      createdAt: initialData?.createdAt || Date.now()
    };

    onSavePrescription(record, andPrint);

    // Show confirmation alert
    setSubmittedAlert(`Prescription ${record.rxNumber} for "${record.patientName}" saved successfully!`);
    setTimeout(() => setSubmittedAlert(null), 5000);

    // Prompt requested: "har paction ka laya submit hon aka bad new open ho jaya"
    // Open a fresh new form instantly!
    resetToNewPatientForm();
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner: Letterhead Info & Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {letterhead.doctorName}
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hidden sm:inline">
                {letterhead.regNumber || 'PMDC Verified'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {letterhead.hospitalOrClinic} • {letterhead.specialty}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {onPreviewPrescription && (
            <button
              type="button"
              onClick={() => {
                const currentDraft: PatientPrescription = {
                  id: initialData?.id || `draft-${Date.now()}`,
                  rxNumber: rxNumber || 'RX-DRAFT',
                  date,
                  time,
                  patientName: patientName || 'Patient Name (Preview)',
                  age: age ? `${age.replace(/y+/gi, '').trim()} Y` : '—',
                  gender,
                  contact,
                  address,
                  weight,
                  bp,
                  pulse,
                  temp,
                  spO2,
                  bloodSugar,
                  complaints,
                  clinicalHistory,
                  diagnosis,
                  medicines,
                  investigations,
                  advice,
                  followUpDate,
                  createdAt: Date.now()
                };
                onPreviewPrescription(currentDraft);
              }}
              className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-2 transition shadow-2xs"
              title="Preview typed prescription on Dr Muhammad Fayyaz's authentic letterhead"
            >
              <Printer className="w-4 h-4 text-amber-700" />
              <span>Preview on Letterhead</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenLetterheadSettings}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition"
            title="Update Doctor name, clinic letterhead, address, and timings"
          >
            <Settings className="w-4 h-4 text-blue-600" />
            <span>Letterhead Details</span>
          </button>
          <button
            type="button"
            onClick={resetToNewPatientForm}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition"
            title="Start fresh new patient prescription form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear / New</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {submittedAlert && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-4 flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold">{submittedAlert}</p>
              <p className="text-xs text-emerald-700">
                A fresh new prescription form is ready for the next patient.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmittedAlert(null)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Prescription Paper Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden">
        
        {/* Prescription Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              Patient Prescription Form
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-md font-mono text-emerald-400 font-bold border border-slate-700">
              {rxNumber || 'RX-2026-0001'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-white border-0 text-xs focus:ring-0 p-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-20 bg-transparent text-white border-0 text-xs focus:ring-0 p-0"
              />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-7">
          
          {/* 1. Patient Demographics & Vitals */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                1. Patient Information & Vitals
              </h3>
              <span className="text-[11px] text-slate-400">* Required field</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Patient Full Name *
                </label>
                <input
                  id="patient-name-input"
                  type="text"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    if (e.target.value) setNameError(false);
                  }}
                  placeholder="e.g. Muhammad Usman / Ayesha Bibi"
                  className={`w-full text-sm font-semibold px-3 py-2 border rounded-xl focus:ring-2 focus:outline-none transition ${
                    nameError
                      ? 'border-rose-400 bg-rose-50/50 ring-2 ring-rose-400/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {nameError && (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1">
                    Please enter the patient's name to proceed.
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Age (Years)
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="Male">Male (Mard)</option>
                  <option value="Female">Female (Khatoon)</option>
                  <option value="Child">Child (Bacha)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Phone / Mobile #
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Address / City
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street / Colony / City"
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Vitals Ribbon */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 mt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Physical Examination & Vital Signs:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">BP (mmHg)</label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    placeholder="120/80"
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Pulse (bpm)</label>
                  <input
                    type="text"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    placeholder="72"
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Temp (°F)</label>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    placeholder="98.6"
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Weight (kg)</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70 kg"
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">SpO2 (%)</label>
                  <input
                    type="text"
                    value={spO2}
                    onChange={(e) => setSpO2(e.target.value)}
                    placeholder="98%"
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Blood Sugar</label>
                  <input
                    type="text"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    placeholder="120 mg/dL"
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 2. Clinical Assessment & Diagnosis */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600" />
                2. Clinical Complaints & Provisional Diagnosis
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Chief Complaints & Symptoms
                </label>
                <textarea
                  value={complaints}
                  onChange={(e) => setComplaints(e.target.value)}
                  placeholder="e.g. Fever for 2 days, sore throat, persistent dry cough, body aches..."
                  rows={3}
                  className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Provisional Diagnosis / Assessment
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Upper Respiratory Tract Infection (URTI) / Acute Gastritis"
                  className="w-full text-xs sm:text-sm px-3 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none mb-2"
                />

                {/* Quick Diagnosis Selection Chips */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {COMMON_DIAGNOSES.slice(0, 6).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDiagnosis(d)}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 transition"
                    >
                      + {d.split(' ')[0]} {d.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Clinical History, Known Allergies or Past Medical Conditions (Optional)
                </label>
                <input
                  type="text"
                  value={clinicalHistory}
                  onChange={(e) => setClinicalHistory(e.target.value)}
                  placeholder="e.g. No known drug allergies, diabetic on oral hypoglycemics..."
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* 3. ℞ Medicines Prescribed */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-serif italic text-blue-700">℞</span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Prescribed Medicines & Dosage
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {medicines.length} medicine(s) added
              </span>
            </div>

            {/* Quick Medicine Adder Card */}
            <div className="bg-blue-50/50 border border-blue-200/80 rounded-2xl p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-blue-600" />
                  Add Medicine to Prescription
                </span>

                {/* Quick Auto-complete Suggestions */}
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Click a common medicine below or type custom
                </span>
              </div>

              {/* Medicine Quick Chips */}
              <div className="flex flex-wrap gap-1.5">
                {COMMON_MEDICINES.slice(0, 8).map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => handleSelectPredefinedMedicine(m)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-2xs"
                  >
                    + {m.name.split(' ')[0]} ({m.strength})
                  </button>
                ))}
              </div>

              {/* Inputs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2.5 pt-1">
                {/* Form Type */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Form</label>
                  <select
                    value={medForm}
                    onChange={(e) => setMedForm(e.target.value as any)}
                    className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Tablet">Tablet (Goli)</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup (Sharbat)</option>
                    <option value="Injection">Injection</option>
                    <option value="Drops">Drops (Qatre)</option>
                    <option value="Sachet">Sachet</option>
                    <option value="Ointment">Ointment / Cream</option>
                    <option value="Inhaler">Inhaler</option>
                  </select>
                </div>

                {/* Medicine Name */}
                <div className="md:col-span-4">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Medicine Name *</label>
                  <input
                    type="text"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddMedicine();
                      }
                    }}
                    placeholder="e.g. Panadol / Augmentin / Risek"
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Strength */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Strength / Mg</label>
                  <input
                    type="text"
                    value={medStrength}
                    onChange={(e) => setMedStrength(e.target.value)}
                    placeholder="500mg"
                    className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Dosage */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Dosage Frequency</label>
                  <input
                    type="text"
                    value={medDosage}
                    onChange={(e) => setMedDosage(e.target.value)}
                    placeholder="1-0-1"
                    className="w-full text-xs font-bold px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Duration */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={medDuration}
                    onChange={(e) => setMedDuration(e.target.value)}
                    placeholder="5 days"
                    className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Instructions & Add Button */}
                <div className="md:col-span-9">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Special Timing / Instruction (Urdu / English)
                  </label>
                  <input
                    type="text"
                    value={medInstruction}
                    onChange={(e) => setMedInstruction(e.target.value)}
                    placeholder="e.g. After meals (Khane ke baad) / Empty stomach"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3 flex items-end">
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add Medicine
                  </button>
                </div>
              </div>

              {/* Dosage Presets Bar */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500 pt-1">
                <span className="font-semibold text-slate-600">Quick Dosage:</span>
                {DOSAGE_PRESETS.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setMedDosage(p.val)}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Added Medicines Table */}
            {medicines.length > 0 ? (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 w-10">#</th>
                      <th className="py-2.5 px-3">Medicine & Form</th>
                      <th className="py-2.5 px-3">Strength</th>
                      <th className="py-2.5 px-3">Dosage</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Instructions</th>
                      <th className="py-2.5 px-3 w-12 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {medicines.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-2.5 px-3 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-slate-900 block">{item.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase">{item.form}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-medium">{item.strength || '—'}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {item.dosage}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-700">{item.duration}</td>
                        <td className="py-2.5 px-3 text-slate-600 italic">{item.instruction || '—'}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveMedicine(item.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                No medicines added yet. Use the medicine adder above to prescribe drugs.
              </div>
            )}
          </section>

          {/* 4. Investigations, Dietary Advice, Follow Up */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                4. Lab Tests, Advice & Follow-Up Date
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lab Tests */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Recommended Lab Tests / Investigations
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200 mb-2">
                  {COMMON_INVESTIGATIONS.map((test) => {
                    const isSelected = investigations.includes(test);
                    return (
                      <button
                        key={test}
                        type="button"
                        onClick={() => handleToggleTest(test)}
                        className={`text-[10px] font-medium px-2 py-1 rounded-md transition ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {test}
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Test */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTest}
                    onChange={(e) => setCustomTest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTest();
                      }
                    }}
                    placeholder="Other specific lab test..."
                    className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTest}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Advice and Follow up */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Doctor Advice & Dietary Guidelines
                  </label>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    placeholder="e.g. Plenty of water, avoid spicy & oily food, rest for 3 days..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Next Follow-Up Visit Date
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 3);
                          setFollowUpDate(d.toISOString().slice(0, 10));
                        }}
                        className="text-[10px] font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        +3 Days
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 7);
                          setFollowUpDate(d.toISOString().slice(0, 10));
                        }}
                        className="text-[10px] font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        +1 Week
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM ACTION BAR - Exactly as the user requested:
            "har pachent ka laya submit hon aka bad new open ho jaya" */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Form pattern stays fixed • Auto-resets on save for next patient</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {initialData && onCancelEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium transition"
              >
                Cancel Edit
              </button>
            )}

            {/* Print & Save */}
            <button
              type="button"
              onClick={() => handleFormSubmit(true)}
              className="px-4 py-2.5 rounded-xl border border-blue-400/30 bg-blue-950/60 hover:bg-blue-900 text-blue-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition"
              title="Save to database and open Print Preview"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>Save & Print Slip</span>
            </button>

            {/* PRIMARY: Submit and open new form */}
            <button
              type="button"
              onClick={() => handleFormSubmit(false)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition transform active:scale-98"
              title="Save current patient and open brand new prescription form"
            >
              <UserPlus className="w-4 h-4" />
              <span>Save & Open New Patient Form</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
