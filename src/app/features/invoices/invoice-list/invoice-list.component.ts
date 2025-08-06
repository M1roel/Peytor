import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../core/services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  imports: [NgClass, CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  constructor(private router: Router, private invoicesService: InvoicesService) {}

  invoices = [
    { id: 1, number: 'INV-001', customer: 'Peter GmbH', date: new Date(), status: 'bezahlt', amount: 199.99 },
    { id: 2, number: 'INV-002', customer: 'Müller AG', date: new Date(), status: 'offen', amount: 349.50 },
  ];

  ngOnInit() {
    this.getInvoices();
  }

  async getInvoices() {
    this.invoices = await this.invoicesService.getInvoices();
  }

  view(id: number) {
    // später: this.router.navigate(['detail', id]);
    console.log('Ansehen', id);
  }

  create() {
    this.router.navigate(['app/invoices/new']);
  }

  edit(id: number) {
    console.log('Bearbeiten', id);
  }

  delete(id: number) {
    console.log('Löschen', id);
  }
}

