import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface UserData {
  uid: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: UserData | null = null;

  constructor(private supabaseService: SupabaseService) {}

  storeUserData(uid: string, name: string, email: string): void {
    this.userData = { uid, name, email };
  }

  async addUserToSupabase(): Promise<void> {
    if (!this.userData) {
      console.error('User data is missing');
      return;
    }

    const { uid, name, email } = this.userData;

    const { error } = await this.supabaseService.getClient()
      .from('users')
      .insert([
        {
          id: uid,
          name,
          email
        }
      ]);

    if (error) {
      console.error('Fehler beim Speichern des Nutzers in Supabase:', error.message);
    }
  }
}
