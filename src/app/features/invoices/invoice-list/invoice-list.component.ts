import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../core/services/invoices.service';
import { ErrorMessagesService } from '../../../core/services/error-messages.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-list',
  imports: [NgClass, CommonModule, CurrencyPipe, DatePipe, MatIcon],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private invoicesService: InvoicesService,
    private errorMessagesService: ErrorMessagesService) { }

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

  correction(status: string, id: number) {
    if (status === 'Offen' || status === 'Entwurf') {
      this.router.navigate(['app/invoices/edit', id]);
    } else {
      console.log('Korrektur nicht möglich, da der Status nicht "Offen" oder "Entwurf" ist.');
    }
  }

  async cancel(status: string, id: number) {
      await this.invoicesService.cancelInvoice(id);
      await this.getInvoices();
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  }

