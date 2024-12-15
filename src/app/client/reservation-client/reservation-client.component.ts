import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonServiceService } from '../../service/mon-service.service';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css']
})
export class ReservationClientComponent implements OnInit {
  selectedService: any;
  availableHours: any[] = [];
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  minDate!: string;
  maxDate!: string;
  iduser!:number;

  constructor(private monServiceService: MonServiceService, private router: Router) {}

  ngOnInit(): void {
    this.selectedService = history.state.service;

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = new Date(today.setFullYear(today.getFullYear() + 1)).toISOString().split('T')[0];
  }

  onDateSelect(event: any): void {
    this.selectedDate = event.target.value;
    // Simuler les heures disponibles
    this.availableHours = [
      { time: '10:00', isBooked: false },
      { time: '11:00', isBooked: false },
      { time: '14:00', isBooked: true }
    ];
  }

  onTimeSelect(event: any): void {
    this.selectedTime = event.target.value;
  }

  confirmReservation(): void {
    const reservation = {
      serviceId: this.selectedService.id,
      date: this.selectedDate,
      time: this.selectedTime
    };
    console.log(reservation);

    this.monServiceService.reserveService(reservation).subscribe(
      () => {
        alert('Réservation confirmée !');
        this.router.navigate(['/list-services']);
      },
      (error) => alert('Erreur lors de la réservation : ' + error)
    );
  }

  goBack(): void {
    this.router.navigate(['/list-services']);
  }
}
