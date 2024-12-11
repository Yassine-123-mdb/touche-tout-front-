import { Component, OnInit } from '@angular/core';
import { MonServiceService } from '../../service/mon-service.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css'
})
export class ListServiceComponent implements OnInit {
    services: any[] = [];
  
    constructor(private monService: MonServiceService) {}
  
    ngOnInit(): void {
      this.loadServices();
    }
  
    // Charger tous les services
    loadServices(): void {
      this.monService.getAllServices().subscribe(
        (data) => {
          this.services = data;
          console.log('Services chargés :', data);
        },
        (error) => {
          console.error('Erreur lors du chargement des services :', error);
        }
      );
    }
  

  selectService(service: any) {
    console.log('Service selected:', service);
    // Vous pouvez rediriger l'utilisateur ou afficher des détails supplémentaires
  }
}
