import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InvoicesService } from '../../../core/services/invoices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  imports: [CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent {
  invoice: any = null;

  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.invoice = await this.invoicesService.getInvoiceById(id);
    }
  }

  calculateTotal() {
    return this.invoice?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    ) || 0;
  }
}

