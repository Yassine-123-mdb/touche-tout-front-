import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MonServiceService {
  private apiUrl = 'https://back-touch-a-tout-production.up.railway.app';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Récupérer les services pour l'utilisateur connecté
  getServices(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    
    return this.http.get<any[]>(`${this.apiUrl}/api/services/user/${userId}`);
  }
  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allService`);
  }

  // Ajouter un nouveau service pour l'utilisateur connecté
  addService(service: any): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    return this.http.post(`${this.apiUrl}/api/services/add/${userId}`, service);
  }

  // Mettre à jour un service existant
  updateService(serviceId: string, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/services/update/${serviceId}`, service);
  }

  // Supprimer un service par ID
  deleteService(serviceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/services/delete/${serviceId}`, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression du service', error);
        throw error;
      })
    );
  }


  // Réserver un service
  reserveService(userId: number, reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/reservations/create/${userId}`, reservation);
  }
  
}
