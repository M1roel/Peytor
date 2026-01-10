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
  private shouldExport: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shouldExport = this.route.snapshot.queryParamMap.get('export') === 'pdf';

    if (id) {
      this.invoice = await this.invoicesService.getInvoiceById(Number(id));
      if (this.shouldExport) {
        this.exportAfterRender();
      }
    }
  }

  calculateTotal() {
    return this.invoice?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    ) || 0;
  }

  private exportAfterRender() {
    setTimeout(() => {
      const element = document.getElementById('invoice-preview');
      if (element) {
        this.invoicesService.exportInvoiceAsPDF(
          element,
          `invoice_${this.invoice?.id ?? 'preview'}.pdf`
        );
      }
    }, 150);
  }
}

