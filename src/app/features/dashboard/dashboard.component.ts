import { Component } from '@angular/core';
import { InvoicesService } from '../../core/services/invoices.service';
import { InvoiceData } from '../../core/models/invoice.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  openInvoices: number = 0;
  openAmount: number = 0;

  constructor (private invoicesService: InvoicesService) { }

  invoices: InvoiceData[] = [];

  ngOnInit() {
    this.getInvoices();
  }

  async getInvoices() {
    this.invoices = await this.invoicesService.getInvoices();
    this.openInvoices = this.invoices.filter(invoice => invoice.status !== 'Entwurf').length;
    this.openAmount = this.invoices
      .filter(invoice => invoice.status === 'Offen' || invoice.status === 'Überfällig')
      .reduce((sum, invoice) => sum + invoice.amount, 0);
  }
}
