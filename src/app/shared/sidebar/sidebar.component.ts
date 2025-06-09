import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  isOpen: boolean = true;

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logoutUser();
      this.router.navigate(['/login']); // Zielseite anpassen
    } catch (error) {
      console.error('Fehler beim Logout:', error);
    }
  }
}
