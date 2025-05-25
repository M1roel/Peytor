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
  nameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private errorMessageService: ErrorMessagesService
  ) {}

  async onSubmit() {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    try {
      const userCredential = await this.authService.createUser(
        this.email,
        this.password
      );
      console.log(userCredential.user);
    } catch (error: any) {
      this.errorMessage = this.errorMessageService.getAuthErrorMessage(
        error.code
      );
    }
  }

  validateForm() {
    if (!this.name) {
      this.errorMessage =
        this.errorMessageService.getFieldRequiredMessage('einen Namen');
      return false;
    }

    if (!this.email) {
      this.errorMessage =
        this.errorMessageService.getFieldRequiredMessage('E-Mail-Adresse');
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage =
        this.errorMessageService.getInvalidEmailFormatMessage();
      return false;
    }

    if (!this.password) {
      this.errorMessage =
        this.errorMessageService.getFieldRequiredMessage('ein Passwort');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = this.errorMessageService.getPasswordMismatchMessage();
      return false;
    }

    if (!this.termsAccepted) {
      this.errorMessage = 'Bitte akzeptiere die Datenschutzbestimmungen.';
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
