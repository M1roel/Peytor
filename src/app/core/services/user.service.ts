import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData: any = {};

  constructor(private supabaseService: SupabaseService) {}

  storeUserData(uid: string, name: string, email: string) {
    this.userData = { uid, name, email };
  }

  async addUserToSupabase(): Promise<void> {
    const { uid, name, email } = this.userData;

    if (!uid || !name || !email) {
      console.error('User data is incomplete');
      return;
    }

    const { error } = await this.supabaseService.getClient()
      .from('users')
      .insert([
        {
          id: uid,
          name,
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Fehler beim Speichern des Nutzers in Supabase:', error.message);
    }
  }
}
