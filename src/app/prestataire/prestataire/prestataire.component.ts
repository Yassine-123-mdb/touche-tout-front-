import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrl: './prestataire.component.css'
})
export class PrestataireComponent implements OnInit {
  // Simulated Data
  prestataireName: string = 'John Doe';
  totalReservations: number = 45;
  pendingReservations: number = 12;
  confirmedReservations: number = 28;
  servicesCount: number = 10;

  recentReservations = [
    {
      service: 'Nettoyage de vitres',
      client: 'Alice Dupont',
      date: new Date('2024-12-01'),
      status: 'confirmée',
    },
    {
      service: 'Jardinage',
      client: 'Marc Durand',
      date: new Date('2024-12-03'),
      status: 'en-attente',
    },
    {
      service: 'Peinture intérieure',
      client: 'Sophie Martin',
      date: new Date('2024-12-05'),
      status: 'annulée',
    },
  ];

  services = [
    {
      title: 'Nettoyage de vitres',
      description: 'Un nettoyage impeccable pour vos fenêtres.',
      price: 50,
      category: 'Ménage',
    },
    {
      title: 'Jardinage',
      description: 'Entretien de votre jardin pour toutes les saisons.',
      price: 70,
      category: 'Jardinage',
    },
  ];

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    // TODO: Replace mock data with real API calls to fetch data.
  }

  // Navigate to Add Service Page
  navigateToAddService(): void {
    this.router.navigate(['/prestataire/addService']);
  }

  // Get status class for badge
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmée':
        return 'confirmée';
      case 'en-attente':
        return 'en-attente';
      case 'annulée':
        return 'annulée';
      default:
        return '';
    }
  }
}