import { Component } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  user = new User(); // Modèle utilisateur
  message: string = 'Login ou mot de passe erronés..';
  err: number = 0; // Pour la gestion des erreurs
  public regitredUser : User = new User();

  constructor(private authService: AuthService, private router: Router) {}
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (response: any) => {
        // Stocker les informations de l'utilisateur dans le service
        this.authService.storeUserData(response);  // Vous pouvez aussi mettre à jour un état global si nécessaire
  
        // Récupérer le rôle pour la navigation
        const roles = response.roles.map((role: any) => role.role);
  
        // Naviguer selon le rôle
        if (roles.includes('ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (roles.includes('CLIENT')) {
          this.router.navigate(['/client']);
        } else if (roles.includes('PRESTATAIRE')) {
          this.router.navigate(['/prestataire']);
        }
      },
      error: (err: any) => {
        console.error(err);
        alert('Erreur de connexion : vérifiez vos informations.');
      }
    });
  }
}    
  

  /* onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.authService.handleLoginResponse(response); // Délègue la logique au service
      },
      error: (err) => {
        this.err = 1;
        if (err.error?.errorCause === 'disabled') {
          this.message =
            'Utilisateur désactivé, veuillez contacter votre administrateur.';
        } else {
          this.message = 'Login ou mot de passe erronés.';
        }
      },
    });
  } */

