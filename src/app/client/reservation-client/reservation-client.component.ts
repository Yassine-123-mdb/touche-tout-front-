import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrl: './reservation-client.component.css'
})
export class ReservationClientComponent {
  reservations = [
    {
      service: 'Plomberie',
      date: new Date(),
      status: 'Confirmé'
    },
    {
      service: 'Mécanique',
      date: new Date(),
      status: 'En attente'
    }
  ];
}
