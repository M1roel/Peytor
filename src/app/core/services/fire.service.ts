import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  public userData: any = {};

  constructor(authService: AuthService) { }

  storeUser(name: string) {
  }
}
