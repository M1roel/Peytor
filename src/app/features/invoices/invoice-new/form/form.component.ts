import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InvoicesService } from '../../../../core/services/invoices.service'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  constructor(private invoicesService: InvoicesService) {}

  invoice = {
    customer: '',
    date: '',
    number: '',
    items: [
      { description: '', quantity: 1, unitPrice: 0 }
    ]
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Rechnung:', this.invoice);
    }
  }

  exportAsPDF() {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    setTimeout(() => {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: -window.scrollY
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgProps = {
          width: canvas.width,
          height: canvas.height
        };

        const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
        const imgWidth = imgProps.width * ratio;
        const imgHeight = imgProps.height * ratio;

        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Rechnung-${this.invoice.number || 'unbenannt'}.pdf`);
      });
    }, 100);
  }

  saveToSupabase() {
  }
}
