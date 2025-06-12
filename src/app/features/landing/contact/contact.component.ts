import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorMessagesService } from '../../../core/services/error-messages.service'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {

  private http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = false;
  errorMessage: string = '';
  showSuccess: boolean = false;

  post = {
    endPoint: 'https://peytor.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private errorService: ErrorMessagesService) {}

  async onSubmit(ngForm: NgForm) {
    if(!this.checkEntries()) return;
    if (ngForm.submitted) {
      if (!this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData))
          .subscribe({
            next: (response) => {
              ngForm.resetForm();
            },
            error: (error) => {
              console.error(error);
            },
        complete: () => {
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        }
      });
      } else if (this.mailTest) {
        alert('Mail test is active. Form not sent.');
        ngForm.resetForm();
      }
    }
  }

  checkEntries(): boolean {
    this.errorMessage = '';

    if (!this.contactData.name) {
      this.errorMessage = this.errorService.getFieldRequiredMessage('Name');
      return false;
    }

    if (!this.contactData.email) {
      this.errorMessage = this.errorService.getFieldRequiredMessage('E-Mail-Adresse');
      return false;
    }

    if (!this.contactData.message) {
      this.errorMessage = this.errorService.getFieldRequiredMessage('Nachricht');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactData.email)) {
      this.errorMessage = this.errorService.getInvalidEmailFormatMessage();
      return false;
    }

    return true;
  }
}
