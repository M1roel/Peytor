import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../core/services/invoices.service';
import { ErrorMessagesService } from '../../../core/services/error-messages.service';
import { MatIcon } from '@angular/material/icon';
import { InvoiceData } from '../../../core/models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  imports: [NgClass, CommonModule, CurrencyPipe, DatePipe, MatIcon],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  showSuccess: boolean = false;
  errorMessage: string = '';
  openDropdownId: number | null = null;

  constructor(
    private router: Router,
    private invoicesService: InvoicesService,
    private errorMessagesService: ErrorMessagesService) { }

  invoices: InvoiceData[] = [];

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

  correction(status: string, id: number) {
    if (status === 'Entwurf') {
      this.router.navigate(['app/invoices/edit', id]);
    } else {
      this.showErrorMsg();
    }
    this.toggleDropdown(id);
  }

  export(id: number) {
    this.router.navigate(['app/invoices/detail', id], {
      queryParams: { export: 'pdf' }
    });
  }

  async cancel(status: string, id: number) {
    if (status === 'Entwurf') {
      await this.invoicesService.cancelInvoice(id);
      await this.getInvoices();
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 4000);
    } else {
      this.showErrorMsg();
    }
    this.toggleDropdown(id);
  }

  toggleDropdown(id: number) {
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  showErrorMsg() {
    this.errorMessage = this.errorMessagesService.getInvoiceErrorMessage();
      setTimeout(() => {
        this.errorMessage = '';
      }, 4000);
  }
}
