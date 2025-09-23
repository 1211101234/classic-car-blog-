import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    PanelModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('jdm-car-blog');

  constructor(private router: Router) {}

  scrollToCarList(event: Event): void {
    event.preventDefault();

    if (this.router.url === '/carlist') {
      // already there → just scroll
      const el = document.getElementById('car-list-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // navigate to /carlist, then scroll
      this.router.navigate(['/carlist']).then(() => {
        setTimeout(() => {
          const el = document.getElementById('car-list-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      });
    }
  }
}
