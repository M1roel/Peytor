import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async createUser(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signUp({
        email,
        password
      });

    if (error) throw error;
    return data;
  }

  async loginUser(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({
        email,
        password
      });

    if (error) throw error;
    return data;
  }

  async logoutUser() {
    const { error } = await this.supabaseService
      .getClient()
      .auth.signOut();

    if (error) throw error;
  }

  async getCurrentUser() {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.getUser();

    if (error) throw error;
    return data.user;
  }
}
