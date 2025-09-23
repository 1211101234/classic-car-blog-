import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class HomeComponent {
  featuredCar = {
    id: 3,
    name: 'Nissan Skyline GT-R R34',
    image: 'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2021/07/20205450/Speedhunters_R34roller-3.jpg',
    description: `The R34 GT-R stands as an icon of the late 90s JDM scene,
    powered by the legendary RB26DETT. Its mix of performance and cultural
    impact makes it unforgettable.`
  };

  tributeQuote = `"Cars are more than machines – they are culture, memory, and passion."`;

  carRaces = [
    {
      name: 'Group B Rally',
      era: '1982–1986',
      description: 'The most extreme rally era, featuring legends like the Audi Quattro S1 and Lancia Delta S4.',
      image: 'https://i.ytimg.com/vi/FN93WoPDJS0/maxresdefault.jpg'
    },
    {
      name: 'JTCC (Japanese Touring Car Championship)',
      era: '1963–1998',
      description: 'Touring car battles with icons like the Civic EG6, Skyline GT-R, and AE86.',
      image: 'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2024/12/04001238/1-Alec-Pender-Speedhunters-Nismo24-110-520x346.jpg'
    },
    {
      name: 'DTM (Deutsche Tourenwagen Masters)',
      era: '1984–present',
      description: 'German touring car championship, known for BMW M3 E30 and Mercedes 190E Evo dominance.',
      image: 'https://www.suissemotorsport.ch/wp-content/uploads/2021/11/8ffd86a1-5873-5387-3f73-b6848bf8d9e8.jpg'
    }
  ];
}
