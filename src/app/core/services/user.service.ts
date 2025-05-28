import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData: any = {};
  private firestore = inject(Firestore);

  constructor() { }

  storeUserData(name: string, email: string) {
    this.userData = {name, email};
  }

  async saveUserData() {
    if (this.userData.name && this.userData.email) {
      const userCollection = collection(this.firestore, 'users');
      await addDoc(userCollection, this.userData);
      console.log('User data saved successfully:', this.userData);
    } else {
      console.error('User data is incomplete');
    }
  }
}
