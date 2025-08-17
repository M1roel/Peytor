import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerService, CustomerSummary } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
  imports: [CommonModule]
})
export class CustomerDetailComponent {
  customer?: CustomerSummary;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customer = await this.customerService.getCustomerById(id) ?? undefined;
    }
  }
}