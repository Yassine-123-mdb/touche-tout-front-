import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Importez le service AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    public authService: AuthService // Injectez AuthService
  ) {}

  // Déconnexion via le AuthService
  logout(): void {
    this.authService.logout();
  }

  // Rediriger vers la page de connexion
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Vérifiez si l'utilisateur est client
  get isClient(): boolean {
    return this.authService.isRole('CLIENT');
  }

  // Récupérez le nom d'utilisateur
  get username(): string | null {
    return this.authService.getUserData().username;
  }
  

}
