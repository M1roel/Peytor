export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate?: number;
}

export interface InvoiceData {
  id?: number;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  status: 'Entwurf' | 'Offen' | 'Bezahlt' | 'Storniert' | 'Überfällig';
  customerName: string;
  customerAddress: string;
  items: InvoiceItem[];
  amount: number;
  user_id: string;
  reverseCharge?: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}