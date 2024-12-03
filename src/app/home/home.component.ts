import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  serviceImages: string[] = [];
  constructor(private router: Router) {}
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
