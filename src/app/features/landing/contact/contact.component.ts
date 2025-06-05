import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  onSubmit() {
    if (!this.name || !this.email || !this.message) {
      alert('Bitte fülle alle Felder aus.');
      return;
    }

    // Später: API-Aufruf o.ä.
    console.log({ name: this.name, email: this.email, message: this.message });
    alert('Danke für deine Nachricht!');
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
