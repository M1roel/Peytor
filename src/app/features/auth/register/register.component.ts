import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '@angular/fire/auth';
import { ErrorMessagesService } from '../../../core/services/error-messages.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  user: User | null = null;
  disabled: boolean = true;
  termsAccepted: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private errorMessageService: ErrorMessagesService
  ) {}

  async onSubmit() {
    await this.validateForm();
    const userCrentials = this.authService.createUser(
      this.email,
      this.password
    );
    console.log((await userCrentials).user);
  }

  validateForm() {
    if (!this.name)
      this.errorMessage =
        this.errorMessageService.getFieldRequiredMessage('einen Namen');
    if (!this.email) {
      this.errorMessage =
        this.errorMessageService.getFieldRequiredMessage('E-Mail-Adresse');
    } else if (!this.isValidEmail(this.email)) {
      this.errorMessage =
        this.errorMessageService.getInvalidEmailFormatMessage();
    }
    if (!this.password) {
      this.errorMessage =
        this.errorMessageService.getFieldRequiredMessage('ein Passwort');
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
