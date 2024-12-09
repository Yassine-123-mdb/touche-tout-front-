import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-nav-pres',
  templateUrl: './nav-pres.component.html',
  styleUrl: './nav-pres.component.css'
})
export class NavPresComponent {
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
