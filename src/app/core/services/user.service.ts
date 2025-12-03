import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: AppUser | null = null;

  constructor(private supabaseService: SupabaseService) { }

  storeUserData(uid: string, name: string, email: string, role?: string): void {
    this.userData = {
      uid,
      name,
      email,
      role
    };
  }

  async addUserToSupabase(): Promise<void> {
    if (!this.userData) {
      console.error('User data is missing');
      return;
    }

    const { name, email, role } = this.userData;

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
          email,
          role: role || 'user'
        }
      ]);

    if (error) {
      console.error('Fehler beim Speichern des Nutzers in Supabase:', error.message);
    }
  }
}