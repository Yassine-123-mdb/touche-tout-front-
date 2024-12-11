import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrl: './navbar-client.component.css'
})
export class NavbarClientComponent {
  prestataireName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Récupérez le nom du prestataire connecté
    this.prestataireName = this.authService.getUserData().username;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
