import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem, PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    ButtonModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  menuItems: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildMenu();
  }

  buildMenu(): void {
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/app-home',  },
      { label: 'Cars', icon: 'pi pi-car', routerLink: '/carlist',  }
    ];

    if (this.authService.isLoggedIn()) {
      this.menuItems.push({
        label: 'Add Car',
        icon: 'pi pi-plus',
        routerLink: '/add-car',
        styleClass: 'text-white hover:text-red-400'
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.buildMenu(); // refresh menu
    this.router.navigate(['/login']);
  }
}
