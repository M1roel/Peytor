import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-invoice',
  imports: [FormsModule],
  templateUrl: './setting-invoice.component.html',
  styleUrl: './setting-invoice.component.scss'
})
export class SettingInvoiceComponent {
  invoicePrefix: string = 'INV';
  startingNumber: number = 1000;
  paymentTerms: number = 30;

  saveSettings() {
    // Hier können Sie die Logik zum Speichern der Einstellungen implementieren
    console.log('Einstellungen gespeichert:', {
      invoicePrefix: this.invoicePrefix,
      invoiceStartingNumber: this.startingNumber,
      paymentTerms: this.paymentTerms
    });
  }
}
