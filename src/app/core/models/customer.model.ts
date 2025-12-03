export interface CustomerSummary {
  id: string;
  customer_number: string;
  company_name: string;
  contact_person?: string;
  email: string;
  phone?: string;
  vat_id?: string;
  industry?: string;
  website?: string;
  language?: string;
  is_active: boolean;
  street?: string;
  zip_code?: string;
  city?: string;
  country?: string;
  notes?: string;
  vat_language?: string;
  house_number?: string;
  created_at: string;
}