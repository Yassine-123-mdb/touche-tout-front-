import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'touchatout-front';

  constructor(public router: Router) {}

  // Fonction pour vérifier si l'utilisateur est sur une route spécifique
  isClientInterface(): boolean {
    // Vérifie si l'URL inclut '/prestataire'
    return this.router.url.startsWith('/prestataire');}
    isPrestInterface(): boolean {
      // Vérifie si l'URL inclut '/prestataire'
      return this.router.url.startsWith('/prestataire');
  
  
}
}
