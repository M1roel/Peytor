import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  constructor() { }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
