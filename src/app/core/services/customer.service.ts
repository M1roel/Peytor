import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface CustomerSummary {
  id: string;
  customer_number: string;
  company_name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private supabaseService: SupabaseService) { }

  async storeCustomerData(customer_number: string, company_name: string): Promise<void> {
    const supabase = this.supabaseService.getClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) throw new Error('Nicht eingeloggt.');

    const { error } = await supabase
      .from('customers')
      .insert([{ customer_number, company_name, user_id: user.id }]);

    if (error) throw error;
  }

  async getCustomers(): Promise<CustomerSummary[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from<'customers', 'public'>('customers')
      .select('id, customer_number, company_name, created_at');

    if (error) {
      console.error('Fehler beim Laden der Kundenliste:', error);
      throw error;
    }

    return data;
  }

}
