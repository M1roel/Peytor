import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../core/services/invoices.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-list',
  imports: [NgClass, CommonModule, CurrencyPipe, DatePipe, MatIcon],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  constructor(private router: Router, private invoicesService: InvoicesService) { }
  
  invoices: any[] = [];

  ngOnInit() {
    this.getInvoices();
  }

  async getInvoices() {
    this.invoices = await this.invoicesService.getInvoices();
  }

  view(id: number) {
    this.router.navigate(['app/invoices/detail', id]);
  }

  create() {
    this.router.navigate(['app/invoices/new']);
  }

  correction(id: number) {
    console.log('Korrigieren', id);
  }

  cancel(id: number) {
    console.log('Stornieren', id);
  }
}

