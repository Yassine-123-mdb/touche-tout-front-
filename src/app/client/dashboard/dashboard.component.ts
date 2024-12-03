import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  usernam = String; // Peut être chargé depuis le service d'authentification.
  constructor(
    public authService: AuthService // Injectez AuthService
  ) {}

 

  // Récupérez le nom d'utilisateur
  get username(): string | null {
    return this.authService.loggedUser;
  }
}
