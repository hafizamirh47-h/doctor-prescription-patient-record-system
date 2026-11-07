import { DoctorLetterhead, PatientPrescription } from '../types/prescription';

export const DEFAULT_LETTERHEAD: DoctorLetterhead = {
  doctorName: 'Dr Muhammad Fayyaz',
  doctorNameUrdu: 'ڈاکٹر محمد فیاض',
  qualifications: 'M.B.B.S, FCPS UROLOGY, (SIUT KARACHI) CHPE (LUMS)',
  qualificationsEn: [
    'M.B.B.S, FCPS UROLOGY',
    '(SIUT KARACHI) CHPE (LUMS)',
    'PEADS UROLOGIST & ADULT UROLOGIST',
    'PENILE IMPLANT SPECIALIST • ROBOTIC SURGEON'
  ],
  qualificationsUrdu: [
    'ایم بی بی ایس، ایف سی پی ایس یورولوجی',
    '(ایس آئی یو ٹی کراچی) سی ایچ پی ای (ایل یو ایم ایس)',
    'پیڈز یورولوجسٹ اینڈ ایڈلٹ یورولوجسٹ',
    'پینائل امپلانٹ سپیشلسٹ / روبوٹک سرجن'
  ],
  specialty: 'Peads Urologist & Adult Urologist | Penile Implant Specialist • Robotic Surgeon',
  specialtyUrdu: 'پیڈز یورولوجسٹ اینڈ ایڈلٹ یورولوجسٹ',
  membershipsEn: [
    'Member of American Urological Association',
    'Member of European Association of Urology',
    'Member of Society Internationale Urology',
    'Member of Singapore Urological Association'
  ],
  membershipsUrdu: [
    'ممبر آف امریکن یورولوجیکل ایسوسی ایشن',
    'ممبر آف سوسائٹی انٹرنیشنل یورولوجی',
    'ممبر آف یورپین ایسوسی ایشن آف یورولوجی',
    'ممبر آف سنگاپور یورولوجیکل ایسوسی ایشن'
  ],
  regNumber: 'PMDC / PMC Reg # 39420-P',
  hospitalOrClinic: 'UROLOGY CLINIC & ADVANCED SURGICAL CARE',
  tagline: 'Excellence in Kidney, Bladder, Prostate & Male Healthcare',
  address: 'Executive Clinics, Specialist Medical Complex',
  city: 'Pakistan',
  phone: '0310-4721333',
  appointmentPhone: '0310-4721333',
  emergencyPhone: '0310-4721333',
  email: 'dr.fayyaz.urology@gmail.com',
  facebook: 'Dr Fayyaz urologist',
  instagram: 'dr_ muhammad.fayyaz',
  youtube: 'Dr Fayyaz Urologist',
  timings: 'By Appointment: Mon - Sat',
  offDays: 'Sunday (Emergency cases on call)',
  disclaimer: 'This prescription is valid for 7 days. Please bring this slip with previous reports on follow-up.',
  themeColor: 'gold',
  paperMode: 'full_letterhead',
  letterheadSource: 'original_image',
  originalImageUrl: '/dr-fayyaz-letterhead.jpeg',
  topMarginCm: 4.5,
  watermark: 'kidney_urology'
};

export const COMMON_MEDICINES = [
  { name: 'Omnic / Flomax (Tamsulosin)', form: 'Capsule' as const, strength: '0.4mg', defaultDosage: '0-0-1', instruction: 'At bedtime after meal / raat sote waqt' },
  { name: 'Rowatinex (Essential Oils)', form: 'Capsule' as const, strength: 'Cap', defaultDosage: '1-1-1', instruction: 'Before meals for renal gravel/stones' },
  { name: 'Ural / Citralka', form: 'Sachet' as const, strength: 'Granules', defaultDosage: '1-1-1', instruction: 'Dissolve 1 sachet in 1 glass water after meals' },
  { name: 'Cefspan (Cefixime)', form: 'Capsule' as const, strength: '400mg', defaultDosage: '1-0-0', instruction: 'After breakfast for 5-7 days' },
  { name: 'Ciproxin (Ciprofloxacin)', form: 'Tablet' as const, strength: '500mg', defaultDosage: '1-0-1', instruction: 'With plenty of water / 2 liter water daily' },
  { name: 'Toradol (Ketorolac)', form: 'Tablet' as const, strength: '10mg', defaultDosage: 'SOS', instruction: 'Only when severe kidney/flank pain occurs' },
  { name: 'Vesicare (Solifenacin)', form: 'Tablet' as const, strength: '5mg', defaultDosage: '1-0-0', instruction: 'Once daily for bladder frequency/urgency' },
  { name: 'Silodosin (Urief)', form: 'Capsule' as const, strength: '8mg', defaultDosage: '0-0-1', instruction: 'Night after dinner for prostate' },
  { name: 'Proscar (Finasteride)', form: 'Tablet' as const, strength: '5mg', defaultDosage: '1-0-0', instruction: 'Once daily' },
  { name: 'Uro-Vaxom', form: 'Capsule' as const, strength: '6mg', defaultDosage: '1-0-0', instruction: 'Morning empty stomach for recurrent UTI' },
  { name: 'Panadol / Paracetamol', form: 'Tablet' as const, strength: '500mg', defaultDosage: '1-0-1', instruction: 'After food' },
  { name: 'Augmentin (Co-Amoxiclav)', form: 'Tablet' as const, strength: '625mg', defaultDosage: '1-0-1', instruction: 'After meals for 5-7 days' },
  { name: 'Risek (Omeprazole)', form: 'Capsule' as const, strength: '20mg', defaultDosage: '1-0-0', instruction: 'Empty stomach before breakfast' },
  { name: 'Flagyl (Metronidazole)', form: 'Tablet' as const, strength: '400mg', defaultDosage: '1-1-1', instruction: 'After meals' },
  { name: 'Spasler Neo', form: 'Tablet' as const, strength: 'Tab', defaultDosage: 'SOS', instruction: 'For abdominal & ureteric spasms' },
  { name: 'Lofnac (Diclofenac Potassium)', form: 'Tablet' as const, strength: '50mg', defaultDosage: '1-0-1', instruction: 'After heavy meal / SOS for colic' }
];

export const COMMON_INVESTIGATIONS = [
  'Ultrasound KUB + Prostate (with Pre & Post Void Residue)',
  'Non-Contrast CT KUB (NCCT KUB) for Urinary Stones',
  'Urine Routine Examination (Urine R/E) with Microscopy',
  'Urine Culture & Sensitivity (Urine C/S)',
  'Serum Creatinine & Blood Urea (RFTs)',
  'Serum Uric Acid & Serum Calcium',
  'PSA Total & Free (Prostate Specific Antigen)',
  'Uroflowmetry (UFM) with Qmax & Voided Volume',
  'Complete Blood Count (CBC) with ESR',
  'Blood Sugar Fasting & Random (BSF / BSR)',
  'HbA1c (Glycated Hemoglobin)',
  'Liver Function Tests (LFTs)',
  'X-Ray KUB (Erect / Supine)'
];

export const COMMON_DIAGNOSES = [
  'Renal Calculi / Kidney Stones (Nephrolithiasis)',
  'Ureteric Calculus with Acute Renal Colic',
  'Urinary Tract Infection (UTI) / Acute Cystitis',
  'Benign Prostatic Hyperplasia (BPH) / LUTS',
  'Overactive Bladder (OAB) / Urgency Incontinence',
  'Hematuria (Gross / Microscopic) under evaluation',
  'Stricture Urethra / Bladder Neck Obstruction',
  'Varicocele / Scrotal Pain',
  'Pelvi-Ureteric Junction (PUJ) Obstruction',
  'Erectile Dysfunction / Male Infertility'
];

export const DOSAGE_PRESETS = [
  { label: '1-0-1 (Subah & Shaam)', val: '1-0-1' },
  { label: '1-1-1 (Subah, Dopehar, Shaam)', val: '1-1-1' },
  { label: '1-0-0 (Subah Nashta)', val: '1-0-0' },
  { label: '0-0-1 (Raat Sote Waqt)', val: '0-0-1' },
  { label: '0-1-0 (Dopehar)', val: '0-1-0' },
  { label: 'SOS (Zaroorat Par)', val: 'SOS' },
  { label: '1 OD (Din Me 1 Bar)', val: '1 OD' },
  { label: '2 BD (2 Goli Subah Shaam)', val: '2 BD' }
];

export const INSTRUCTION_PRESETS = [
  'After meals (Khane ke baad)',
  'Before meals (Khane se pehle / Niharmuh)',
  'With milk (Doodh ke sath)',
  'With warm water (Neem garm pani ke sath)',
  'At bedtime (Raat sote waqt)',
  'Only when needed in severe pain (Sirf Shadeed dard me)'
];

export const INITIAL_SAMPLE_RECORDS: PatientPrescription[] = [
  {
    id: 'rx-seed-1',
    rxNumber: 'RX-2026-0001',
    date: '2026-11-07',
    time: '11:30 AM',
    patientName: 'Ahmad Raza',
    age: '34 Y',
    gender: 'Male',
    contact: '0301-4455667',
    address: 'Model Town, Block B',
    weight: '72 kg',
    bp: '125/80 mmHg',
    pulse: '76 bpm',
    temp: '98.6 °F',
    bloodSugar: '110 mg/dL',
    complaints: 'Throat irritation, dry cough for 3 days, mild body ache',
    clinicalHistory: 'No known drug allergies, non-smoker',
    diagnosis: 'Acute Pharyngitis / Viral URTI',
    medicines: [
      {
        id: 'm-1',
        name: 'Augmentin (Co-Amoxiclav)',
        form: 'Tablet',
        strength: '625mg',
        dosage: '1-0-1',
        duration: '5 days',
        instruction: 'After meals (Khane ke baad)'
      },
      {
        id: 'm-2',
        name: 'Panadol Extra',
        form: 'Tablet',
        strength: '500mg',
        dosage: '1-0-1',
        duration: '3 days',
        instruction: 'After meals (Khane ke baad)'
      },
      {
        id: 'm-3',
        name: 'Hydryllin',
        form: 'Syrup',
        strength: '120ml',
        dosage: '2 tsp TDS',
        duration: '5 days',
        instruction: 'With warm water (Neem garm pani ke sath)'
      }
    ],
    investigations: ['CBC with ESR (if fever persists)'],
    advice: 'Salt water gargles 3 times a day. Avoid chilled beverages and oily food. Complete antibiotic course.',
    followUpDate: '2026-11-12',
    createdAt: Date.now() - 7200000
  },
  {
    id: 'rx-seed-2',
    rxNumber: 'RX-2026-0002',
    date: '2026-11-07',
    time: '12:15 PM',
    patientName: 'Fatima Bibi',
    age: '52 Y',
    gender: 'Female',
    contact: '0322-8899112',
    address: 'Gulberg III, Lahore',
    weight: '68 kg',
    bp: '145/95 mmHg',
    pulse: '82 bpm',
    temp: '98.4 °F',
    bloodSugar: '185 mg/dL (Random)',
    complaints: 'Occasional morning dizziness, burning epigastric discomfort, fatigue',
    clinicalHistory: 'Hypertensive for 4 years, poorly compliant with meds',
    diagnosis: 'Uncontrolled Hypertension + Acid Peptic Disease',
    medicines: [
      {
        id: 'm-4',
        name: 'Norvasc (Amlodipine)',
        form: 'Tablet',
        strength: '5mg',
        dosage: '1-0-0',
        duration: '1 month',
        instruction: 'Morning daily after breakfast'
      },
      {
        id: 'm-5',
        name: 'Risek (Omeprazole)',
        form: 'Capsule',
        strength: '20mg',
        dosage: '1-0-0',
        duration: '14 days',
        instruction: 'Before meals (Khane se pehle / Niharmuh)'
      },
      {
        id: 'm-6',
        name: 'Gaviscon',
        form: 'Syrup',
        strength: 'Liquid',
        dosage: '2 tbsp TDS',
        duration: '7 days',
        instruction: 'After meals & bedtime'
      }
    ],
    investigations: [
      'HbA1c (Glycated Hemoglobin)',
      'Serum Creatinine & Blood Urea (RFTs)',
      'ECG (12 Lead)',
      'Lipid Profile (Cholesterol, Triglycerides)'
    ],
    advice: 'Strict low salt diet (<2g/day). 30 minutes daily brisk walk. Daily BP charting morning and evening.',
    followUpDate: '2026-11-14',
    createdAt: Date.now() - 3600000
  }
];
