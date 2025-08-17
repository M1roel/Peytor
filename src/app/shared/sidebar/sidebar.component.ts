import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  constructor(private router: Router, private authService: AuthService) {
    this.updateSidebar(window.innerWidth);

    window.addEventListener('resize', () => {
      this.updateSidebar(window.innerWidth);
    });
  }

  isOpen: boolean = true;

  private updateSidebar(width: number) {
    const isMobile = width <= 768;

    if (isMobile) {
      this.isOpen = true;
  }
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logoutUser();
      this.router.navigate(['/login']);
    } catch (error: any) {
      if (error.message.includes('LockManager')) {
        console.warn('Ein anderer Auth-Vorgang war aktiv. Erzwungener Logout.');
        this.router.navigate(['/login']);
      } else {
        console.error('Logout-Fehler:', error);
      }
    }
  }
}
