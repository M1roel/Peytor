import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

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

  async getInvoices() {
    const { data, error } = await this.supabaseService.getClient()
      .from('invoices')
      .select('*');

    if (error) {
      console.error('Error fetching invoices:', error);
      return [];
    }

    return data;
  }

  async createInvoice(invoice: any) {
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
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    );

    const payload = {
      ...invoice,
      amount,
      user_id: user.id
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

    return data;
  }

  async getInvoiceById(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }
    return data;
  }

}
