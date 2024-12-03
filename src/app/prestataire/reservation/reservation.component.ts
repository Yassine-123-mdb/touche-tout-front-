import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  searchQuery: string = '';
filterStatus: string = '';

reservations = [
  {
    id: 1,
    client: 'Jean Dupont',
    service: 'Nettoyage de vitres',
    date: new Date(),
    status: 'en attente',
  },
  {
    id: 2,
    client: 'Alice Martin',
    service: 'Réparation informatique',
    date: new Date(),
    status: 'confirmée',
  },
  {
    id: 3,
    client: 'Pierre Laurent',
    service: 'Peinture intérieure',
    date: new Date(),
    status: 'annulée',
  },
];

filteredReservations() {
  return this.reservations.filter((reservation) => {
    const matchesQuery =
      !this.searchQuery ||
      reservation.client.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      reservation.service.toLowerCase().includes(this.searchQuery.toLowerCase());
    const matchesStatus =
      !this.filterStatus || reservation.status === this.filterStatus;
    return matchesQuery && matchesStatus;
  });
}

acceptReservation(id: number) {
  const reservation = this.reservations.find((res) => res.id === id);
  if (reservation) reservation.status = 'confirmée';
}

rejectReservation(id: number) {
  const reservation = this.reservations.find((res) => res.id === id);
  if (reservation) reservation.status = 'annulée';
}

getStatusClass(status: string) {
  switch (status) {
    case 'confirmée':
      return 'badge confirmée';
    case 'en attente':
      return 'badge en-attente';
    case 'annulée':
      return 'badge annulée';
    default:
      return '';
  }
}

}
