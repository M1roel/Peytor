export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate?: number;
}

export interface InvoiceData {
  id?: number;
  user_id: string;
  customer: string;
  date: Date;
  number: string;
  items: InvoiceItem[];
  status: 'Entwurf' | 'Offen' | 'Bezahlt' | 'Storniert' | 'Überfällig';
  amount: number;
  reverseCharge?: boolean;
}