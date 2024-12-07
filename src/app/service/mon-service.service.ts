import { Injectable } from '@angular/core';
import { Prestataire } from '../model/Prestataire'; // Importez le modèle Prestataire
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MonServiceService {
  private prestataires: Prestataire[] = [
    { name: 'Prestataire 1', service: 'Jardinage', price: 30 },
    { name: 'Prestataire 2', service: 'Plomberie', price: 50 },
    { name: 'Prestataire 3', service: 'Électricité', price: 40 },
    { name: 'Prestataire 4', service: 'Jardinage', price: 25 },
    { name: 'Prestataire 5', service: 'Plomberie', price: 60 },
    { name: 'Prestataire 6', service: 'Réparation', price: 35 },
  ];
  private helper = new JwtHelperService();

  private apiUrl = 'https://back-touch-a-tout-production.up.railway.app';

  constructor(private http: HttpClient) { }
  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl+'/addService', service);
  }

  // Méthode pour télécharger l'image
  uploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl+'/upload-image', formData);
  }

  getPrestataires(searchQuery: string, serviceType: string, priceRange: { min: number, max: number }, priceSort: string): Promise<Prestataire[]> {
    return new Promise((resolve) => {
      let filteredPrestataires = this.prestataires;

      // Filtrage par type de service
      if (serviceType) {
        filteredPrestataires = filteredPrestataires.filter(prestataire => prestataire.service === serviceType);
      }

      // Filtrage par prix
      if (priceRange) {
        filteredPrestataires = filteredPrestataires.filter(prestataire => 
          prestataire.price >= priceRange.min && prestataire.price <= priceRange.max
        );
      }

      // Filtrage par nom de prestataire ou service
      if (searchQuery) {
        filteredPrestataires = filteredPrestataires.filter(prestataire =>
          prestataire.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prestataire.service.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Tri par prix
      if (priceSort === 'asc') {
        filteredPrestataires = filteredPrestataires.sort((a, b) => a.price - b.price);
      } else if (priceSort === 'desc') {
        filteredPrestataires = filteredPrestataires.sort((a, b) => b.price - a.price);
      }

      resolve(filteredPrestataires);
    });
  }
}
