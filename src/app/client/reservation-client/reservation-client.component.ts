import { Component, OnInit } from '@angular/core';
import { MonServiceService } from '../../service/mon-service.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';  // Importer Router pour la navigation

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css']
})
export class ReservationClientComponent implements OnInit {
  services: any[] = [];
  selectedService: any;
  isModalOpen = false;
  availableHours: any[] = [];
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  minDate!: string;
  maxDate!: string;
  userId!: number;

  constructor(
    private monServiceService: MonServiceService,
    private authService: AuthService,
    private router: Router  // Injecter Router
  ) {}

  ngOnInit(): void {
    // Récupérer les services disponibles
    this.monServiceService.getAllServices().subscribe((services) => {
      this.services = services;
    });

    // Définir la date minimale et maximale pour la réservation
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Date du jour
    this.maxDate = new Date(today.setFullYear(today.getFullYear() + 1)).toISOString().split('T')[0]; // Date maximale dans un an

    // Récupérer l'ID de l'utilisateur connecté
    const userId = this.authService.getCurrentUserId();
  }

  openReservationModal(service: any): void {
    this.selectedService = service;
    this.isModalOpen = true;
    this.selectedDate = null;
    this.selectedTime = null;
    this.availableHours = [];
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onDateSelect(event: any): void {
    this.selectedDate = event.target.value;
    // Appeler l'API pour récupérer les heures disponibles
  }

  onTimeSelect(event: any): void {
    this.selectedTime = event.target.value;
  }

 

  confirmReservation(): void {
    if (this.selectedDate && this.selectedTime) {
      const reservation = {
        serviceId: this.selectedService.id,
        reservationDate: this.selectedDate,
        reservationTime: this.selectedTime
      };

      // Appel au service pour effectuer la réservation
      this.monServiceService.reserveService(this.userId, reservation).subscribe(
        (response) => {
          alert('Réservation confirmée !');
          this.closeModal();
        },
        (error) => {
          alert('Erreur lors de la réservation');
        }
      );
    }
  }
  goBack(): void {
    this.router.navigate(['/list-services']);
  }
}
