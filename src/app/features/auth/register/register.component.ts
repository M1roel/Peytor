import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { SupabaseService } from '../../../core/services/supabase.service';
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
  disabled: boolean = true;
  termsAccepted: boolean = false;
  errorMessage: string = '';
  showSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private supabaseService: SupabaseService,
    private errorMessageService: ErrorMessagesService,
    private router: Router
  ) { }

  async onSubmit() {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    try {
      const result = await this.authService.createUser(
        this.email,
        this.password
      );
      const uid = result.user?.id;
      if (!uid) {
        throw new Error('Benutzer-ID konnte nicht ermittelt werden.');
      }
      this.userService.storeUserData(uid, this.name, this.email);
      await this.userService.addUserToSupabase();
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigate(['login']);
      }, 3000);
    } catch (error: any) {
      this.errorMessage = this.errorMessageService.getAuthErrorMessage(
        error?.code || error?.message || 'unknown'
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

  async testConnection() {
    try {
      const { data, error } = await this.supabaseService.getClient().auth.signUp({
        email: 'test@example.com',
        password: '12345678'
      });

      if (error) {
        console.error('Fehler:', error.message);
      } else {
        console.log('Erfolg:', data);
      }
    } catch (err) {
      console.error('Verbindungsfehler:', err);
    }
  }

}
