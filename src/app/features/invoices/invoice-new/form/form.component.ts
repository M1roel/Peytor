import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

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
    // hier speichern oder an Backend senden
  }
}
}
