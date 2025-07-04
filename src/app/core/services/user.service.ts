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

  constructor(private supabaseService: SupabaseService) { }

  storeUserData(uid: string, name: string, email: string): void {
    this.userData = { uid, name, email };
  }

  async addUserToSupabase(): Promise<void> {
    if (!this.userData) {
      console.error('User data is missing');
      return;
    }

    const { name, email } = this.userData;

    const {
      data: { user },
      error: userError
    } = await this.supabaseService.getClient().auth.getUser();

    if (userError || !user) {
      console.error('Fehler beim Abrufen des eingeloggten Benutzers:', userError?.message);
      return;
    }

    const { error } = await this.supabaseService.getClient()
      .from('users')
      .insert([
        {
          id: user.id,
          name,
          email
        }
      ]);

    if (error) {
      console.error('Fehler beim Speichern des Nutzers in Supabase:', error.message);
    }
  }
}
