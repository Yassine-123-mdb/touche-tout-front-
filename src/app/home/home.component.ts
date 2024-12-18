import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MonServiceService } from '../service/mon-service.service';
import { Prestataire } from '../model/Prestataire';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
  }

  

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSelectProvider() {
    this.router.navigate(['/select-provider']);
  }
}
