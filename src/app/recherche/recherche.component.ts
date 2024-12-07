import { Component } from '@angular/core';
import { MonServiceService } from '../service/mon-service.service';
import { Router } from '@angular/router';
import { Prestataire } from '../model/Prestataire';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {


serviceImages: string[] = [];
  prestataires: Prestataire[] = [];
  serviceTypes: string[] = ['Jardinage', 'Plomberie', 'Électricité', 'Bricolage', 'Garde d\'enfants', 'Aide à domicile', 'Aide aux devoirs', 'Maçonnerie', 'Peinture', 'Nettoyage de vitres', 'Ménage'];
  selectedService: string = '';
  minPrice: number = 0;
  maxPrice: number = 100; // Plage de prix par défaut
  priceSort: string = 'asc'; // Tri ascendant par défaut
  searchQuery: string = '';

  constructor(private router: Router,private prestataireService: MonServiceService) {}

  
  ngOnInit(): void {
    // Chemins des images dans le dossier assets/service
    this.serviceImages = [
      'assets/service/batiment.jfif',
      'assets/service/brico.jfif',
      'assets/service/plomb.jfif',
      // Ajoutez d'autres images ici...
    ];
    this.loadPrestataires();
  }
  onSearch(): void {
    this.loadPrestataires();
  }
  onServiceTypeChange(): void {
    this.loadPrestataires();
  }

  onPriceChange(): void {
    this.loadPrestataires();
  }

  onSortPriceChange(sort: string): void {
    this.priceSort = sort;
    this.loadPrestataires();
  }
  loadPrestataires(): void {
    this.prestataireService.getPrestataires(this.searchQuery, this.selectedService, { min: this.minPrice, max: this.maxPrice }, this.priceSort).then((results: Prestataire[]) => {
      this.prestataires = results;
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSelectProvider() {
    this.router.navigate(['/select-provider']);
  }
}
