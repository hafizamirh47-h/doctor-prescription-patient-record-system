export interface DoctorLetterhead {
  doctorName: string;
  doctorNameUrdu?: string;
  qualifications: string;
  qualificationsUrdu?: string[];
  qualificationsEn?: string[];
  specialty: string;
  specialtyUrdu?: string;
  subSpecialties?: string[];
  membershipsEn?: string[];
  membershipsUrdu?: string[];
  regNumber: string;
  hospitalOrClinic: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  appointmentPhone: string;
  emergencyPhone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  timings: string;
  offDays: string;
  disclaimer: string;
  themeColor: 'gold' | 'blue' | 'emerald' | 'teal' | 'indigo' | 'crimson';
  paperMode: 'full_letterhead' | 'blank_top_preprinted';
  letterheadSource: 'original_image' | 'vector_digital' | 'preprinted_pad';
  originalImageUrl: string;
  topMarginCm: number;
  watermark: 'kidney_urology' | 'caduceus' | 'none';
}

export interface MedicineItem {
  id: string;
  name: string;
  form: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Drops' | 'Ointment' | 'Inhaler' | 'Sachet';
  strength?: string;
  dosage: string; // e.g. 1-0-1, TDS, Once daily
  duration: string; // e.g. 5 days, 1 week
  instruction: string; // e.g. After meals, Before meals, At bedtime
}

export interface PatientPrescription {
  id: string;
  rxNumber: string;
  date: string;
  time: string;
  patientName: string;
  age: string;
  gender: 'Male' | 'Female' | 'Child' | 'Other';
  contact: string;
  address?: string;
  weight?: string;
  bp?: string;
  pulse?: string;
  temp?: string;
  spO2?: string;
  bloodSugar?: string;
  complaints: string;
  clinicalHistory?: string;
  diagnosis: string;
  medicines: MedicineItem[];
  investigations: string[];
  advice: string;
  followUpDate?: string;
  createdAt: number;
}
