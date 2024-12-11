import { Component } from '@angular/core';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css'
})
export class ListServiceComponent {
  services = [
    {
      title: 'Premium Cleaning',
      description: 'Top-notch cleaning services to make your home shine.',
      price: 100,
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Gardening Maintenance',
      description: 'Professional gardening services for a beautiful yard.',
      price: 80,
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Personal Training',
      description: 'Achieve your fitness goals with expert trainers.',
      price: 120,
      imageUrl: 'https://via.placeholder.com/300x200'
    }
  ];

  selectService(service: any) {
    console.log('Service selected:', service);
    // Vous pouvez rediriger l'utilisateur ou afficher des détails supplémentaires
  }
}
