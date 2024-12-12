import { Component, OnInit } from '@angular/core';
import { MonServiceService } from '../../service/mon-service.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  services: any[] = [];
  filteredServices: any[] = [];
  categories: string[] = [];

  constructor(private monService: MonServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  // Charger tous les services
  loadServices(): void {
    this.monService.getAllServices().subscribe(
      (data) => {
        this.services = data;
        this.filteredServices = data; // Initialiser avec tous les services
        this.categories = this.getCategories(data); // Récupérer les catégories
        console.log('Services chargés :', data);
      },
      (error) => {
        console.error('Erreur lors du chargement des services :', error);
      }
    );
  }

  // Extraire les catégories uniques des services
  getCategories(services: any[]): string[] {
    return [...new Set(services.map(service => service.category))];
  }

  // Filtrer les services par catégorie
  filterByCategory(category: string): void {
    if (category === 'Tous') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service => service.category === category);
    }
  }

  // Sélectionner un service pour la réservation
  selectService(service: any) {
    console.log('Service sélectionné :', service);
    // Ajoutez la logique pour réserver le service, rediriger vers une page de détails ou ajouter à un panier.
  }
}
