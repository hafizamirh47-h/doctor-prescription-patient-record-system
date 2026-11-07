import { DoctorLetterhead, PatientPrescription } from '../types/prescription';
import { DEFAULT_LETTERHEAD, INITIAL_SAMPLE_RECORDS } from '../data/defaultData';

const STORAGE_KEY_LETTERHEAD = 'doctor_rx_letterhead_v2_fayyaz';
const STORAGE_KEY_RECORDS = 'doctor_rx_records_v2_fayyaz';
const STORAGE_KEY_COUNTER = 'doctor_rx_counter_v1';

export function getSavedLetterhead(): DoctorLetterhead {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LETTERHEAD);
    if (raw) {
      return { ...DEFAULT_LETTERHEAD, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Failed to load letterhead from localStorage', err);
  }
  return DEFAULT_LETTERHEAD;
}

export function saveLetterhead(letterhead: DoctorLetterhead): void {
  try {
    localStorage.setItem(STORAGE_KEY_LETTERHEAD, JSON.stringify(letterhead));
  } catch (err) {
    console.error('Failed to save letterhead to localStorage', err);
  }
}

export function getPrescriptions(): PatientPrescription[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load prescriptions from localStorage', err);
  }
  // Initialize with initial sample records if fresh
  savePrescriptions(INITIAL_SAMPLE_RECORDS);
  return INITIAL_SAMPLE_RECORDS;
}

export function savePrescriptions(list: PatientPrescription[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save prescriptions list', err);
  }
}

export function savePrescription(item: PatientPrescription): PatientPrescription[] {
  const current = getPrescriptions();
  const existingIndex = current.findIndex((p) => p.id === item.id);
  let updated: PatientPrescription[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = item;
  } else {
    updated = [item, ...current];
  }
  savePrescriptions(updated);
  return updated;
}

export function deletePrescription(id: string): PatientPrescription[] {
  const current = getPrescriptions();
  const updated = current.filter((p) => p.id !== id);
  savePrescriptions(updated);
  return updated;
}

export function getNextRxNumber(): string {
  try {
    const currentYear = new Date().getFullYear();
    const rawCounter = localStorage.getItem(STORAGE_KEY_COUNTER);
    let count = rawCounter ? parseInt(rawCounter, 10) : 3;
    if (isNaN(count)) count = 3;
    const nextCount = count + 1;
    localStorage.setItem(STORAGE_KEY_COUNTER, nextCount.toString());
    const padded = String(nextCount).padStart(4, '0');
    return `RX-${currentYear}-${padded}`;
  } catch (err) {
    console.warn('Counter issue, generating timestamp rxNumber', err);
    return `RX-${Date.now().toString().slice(-6)}`;
  }
}

export function exportRecordsAsJSON(records: PatientPrescription[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `patient_records_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
