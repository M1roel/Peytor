import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';  

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private supabaseService: SupabaseService) { }

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
}
