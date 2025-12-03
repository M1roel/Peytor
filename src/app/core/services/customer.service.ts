import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { CustomerSummary } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private supabaseService: SupabaseService) { }

  async storeCustomerData(customer: CustomerSummary): Promise<void> {
    const supabase = this.supabaseService.getClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) throw new Error('Nicht eingeloggt.');

    const payload = {
      user_id: user.id,
      ...customer
    };

    const { error } = await supabase
      .from('customers')
      .insert([payload]);

    if (error) throw error;
  }

  async getCustomers(): Promise<CustomerSummary[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('customers')
      .select('id, customer_number, company_name, created_at, email, phone, vat_id, industry, website, language, is_active, street, zip_code, city, country, notes, vat_language, house_number');

    if (error) {
      console.error('Fehler beim Laden der Kundenliste:', error);
      throw error;
    }

    return data as CustomerSummary[];
  }

  async getCustomerById(id: string): Promise<CustomerSummary | null> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Fehler beim Laden des Kunden:', error);
      throw error;
    }

    return data as CustomerSummary;
  }
}