import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { InvoiceData } from '../models/invoice.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})

export class InvoicesService {

  constructor(private supabaseService: SupabaseService) { }

  async getUser() {
    const supabase = this.supabaseService.getClient();
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return null;
    }
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user;
  }

  async getInvoices(): Promise<InvoiceData[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('invoices')
      .select('*');

    if (error) {
      console.error('Error fetching invoices:', error);
      return [];
    }

    return data as InvoiceData[];
  }

  async createInvoice(invoice: InvoiceData): Promise<InvoiceData | null> {
    const supabase = this.supabaseService.getClient();

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError);
      return null;
    }

    if (!user) {
      console.error('No authenticated user found');
      return null;
    }

    const amount = invoice.items.reduce(
      (sum: number, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const payload: InvoiceData = {
      ...invoice,
      amount,
      user_id: user.id,
      reverseCharge: invoice.reverseCharge ?? false
    };

    const { data, error } = await supabase
      .from('invoices')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating invoice:', error);
      return null;
    }

    return data as InvoiceData;
  }

  async getInvoiceById(id: number): Promise<InvoiceData | null> {
    const { data, error } = await this.supabaseService.getClient()
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }
    return data as InvoiceData;
  }

  async updateInvoice(id: number, updates: Partial<InvoiceData>): Promise<InvoiceData | null> {
    const { data, error } = await this.supabaseService.getClient()
      .from('invoices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating invoice:', error);
      return null;
    }

    return data as InvoiceData;
  }

  async cancelInvoice(id: number): Promise<InvoiceData[] | null> {
    const { data, error } = await this.supabaseService.getClient()
      .from('invoices')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error deleting invoice:', error);
      return null;
    }

    return data as InvoiceData[];
  }

  async exportInvoiceAsPDF(element: HTMLElement, fileName: string) {
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  }
}
