import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
name: string = '';
email: string = '';
password: string = '';
confirmPassword: string = '';
user: User | null = null;

  constructor(private authService: AuthService) { }

  async onSubmit(){
    const userCrentials = this.authService.createUser(this.email, this.password);
    console.log((await userCrentials).user);
  } 
}
