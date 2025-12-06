import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerSummary } from '../../../core/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  customers: CustomerSummary[] = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  async ngOnInit() {
    try {
      this.customers = await this.customerService.getCustomers();
    } catch (error) {
      console.error('Fehler beim Laden der Kundenliste:', error);
    }
  }

  async showDetails(customer: CustomerSummary) {
    try {
      this.router.navigate(['/app/customers/detail', customer.id]);
    } catch (error) {
      console.error('Fehler beim Laden der Kundendetails:', error);
    }
  }
}
