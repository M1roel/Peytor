import { inject, Injectable } from '@angular/core';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData: any = {};
  private firestore = inject(Firestore);

  constructor() {}

  storeUserData(uid: string, name: string, email: string) {
    this.userData = { uid, name, email };
  }

  async addUserToFirestore(): Promise<void> {
    const { uid, name, email } = this.userData;

    if (!uid || !name || !email) {
      console.error('User data is incomplete');
      return;
    }

    const userDocRef = doc(this.firestore, 'users', uid);
    await setDoc(userDocRef, {
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
