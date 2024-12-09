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

  constructor(private authService: AuthService, private router: Router) {}
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        
          this.message = 'Login réussi.';
          console.log("ok");
          this.authService.redirectUser() // Par exemple
        
      },
      error: (err) => {
        this.message = 'Erreur lors de la connexion.';
        this.err = 1;
      }
    });
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
}
