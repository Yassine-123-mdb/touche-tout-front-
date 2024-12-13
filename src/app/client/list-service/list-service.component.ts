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
  selectedCategory: string = '';
  maxPrice: number = 0;
  maxPriceFilter: number = 0;  // Le filtre du prix maximum

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
        this.maxPrice = Math.max(...data.map(service => service.price)); // Trouver le prix max
        this.maxPriceFilter = this.maxPrice;  // Initialiser avec le prix max
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

  // Filtrer les services par catégorie et prix
  filterServices(): void {
    this.filteredServices = this.services.filter(service => {
      return (
        (this.selectedCategory ? service.category === this.selectedCategory : true) &&
        service.price <= this.maxPriceFilter
      );
    });
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.selectedCategory = '';
    this.maxPriceFilter = this.maxPrice;
    this.filterServices();
  }

  // Sélectionner un service pour la réservation
  selectService(service: any): void {
    console.log('Service sélectionné :', service);
    // Ajoutez la logique pour réserver le service, rediriger vers une page de détails ou ajouter à un panier.
  }
}
