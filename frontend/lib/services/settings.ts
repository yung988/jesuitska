import { fetchAPI } from '../api';

export interface Settings {
  id: number;
  documentId: string;
  pensionName: string;
  address: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy?: string;
  termsAndConditions?: string;
  privacyPolicy?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get settings
 */
export async function getSettings(): Promise<{ data: Settings }> {
  return fetchAPI('/setting?populate=*');
}
