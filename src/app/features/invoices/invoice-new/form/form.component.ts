import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InvoicesService } from '../../../../core/services/invoices.service';
import { InvoiceData } from '../../../../core/models/invoice.model';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  constructor(private invoicesService: InvoicesService) { }

  invoice: InvoiceData = {
    number: '',
    date: new Date(),
    status: 'Entwurf',
    customer: '',
    items: [
      { description: '', quantity: 1, unitPrice: 0 }
    ],
    amount: 0,
    user_id: '',
    reverseCharge: false
  };

  addItem() {
    this.invoice.items.push({ description: '', quantity: 1, unitPrice: 0 });
  }

  removeItem(index: number) {
    this.invoice.items.splice(index, 1);
  }

  calculateTotal() {
    return this.invoice.items.reduce((sum, item) =>
      sum + item.quantity * item.unitPrice, 0);
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      try {
        const response = await this.invoicesService.createInvoice(this.invoice);
        console.log('Rechnung gespeichert:', response);
        form.resetForm({
          invoiceNumber: '',
          date: new Date(),
          dueDate: new Date(),
          status: 'Entwurf',
          customerName: '',
          customerAddress: '',
          items: [{ description: '', quantity: 1, unitPrice: 0 }],
          amount: 0,
          user_id: '',
          reverseCharge: false,
          notes: '',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (error) {
        console.error('Fehler beim Speichern:', error);
      }
    }
  }

  exportAsPDF() {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    setTimeout(() => {
      this.invoicesService.exportInvoiceAsPDF(
        element,
        `Rechnung-${this.invoice.number || 'unbenannt'}.pdf`
      );
    }, 100);
  }
}
