import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  constructor() { }
}
