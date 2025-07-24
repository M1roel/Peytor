import { Component } from '@angular/core';
import  { CommonModule } from '@angular/common';
import { CustomerService, CustomerSummary } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  customers: CustomerSummary[] = [];

  constructor(private customerService: CustomerService) { }
  
  async ngOnInit() {
    try {
      this.customers = await this.customerService.getCustomers();
    } catch (error) {
      console.error('Fehler beim Laden der Kundenliste:', error);
    }
  }
}
