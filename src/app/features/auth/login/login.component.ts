import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessagesService } from '../../../core/services/error-messages.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: string = '';
  email: string = '';
  password: string = '';
  disabled: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorService: ErrorMessagesService
  ) {}

  async onSubmit() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte E-Mail und Passwort eingeben.';
      return;
    }

    try {
      await this.authService.loginUser(this.email, this.password);
      this.router.navigate(['app/invoices']);
    } catch (error: any) {
      this.handleLoginError(error);
    }
  }

  handleLoginError(error: any) {
    this.errorMessage = this.errorService.getAuthErrorMessage(error.code);
  }
}
