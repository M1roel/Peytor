import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('invoicePreview') invoicePreviewRef?: ElementRef<HTMLElement>;
  private shouldExportPdf = false;

  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); 
    this.shouldExportPdf = this.route.snapshot.queryParamMap.get('export') === 'pdf';
    if (id) {
      this.invoice = await this.invoicesService.getInvoiceById(Number(id));
      if (this.shouldExportPdf) {
        setTimeout(() => this.exportAsPdf(), 0); // wait for view to render
      }
    }
  }

  calculateTotal() {
    return this.invoice?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    ) || 0;
  }

  async exportAsPdf() {
    if (!this.shouldExportPdf || !this.invoicePreviewRef?.nativeElement) return;
    const fileName = this.invoice?.number ? `invoice-${this.invoice.number}.pdf` : 'invoice.pdf';
    await this.invoicesService.exportInvoiceAsPDF(this.invoicePreviewRef.nativeElement, fileName);
    this.shouldExportPdf = false;
  }
}

