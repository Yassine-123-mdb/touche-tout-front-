import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonServiceService {

  private baseUrl = 'https://back-touch-a-tout-production.up.railway.app/api/services';

  constructor(private http: HttpClient) { }

  addService(serviceData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, serviceData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/{userId}`);
  }

  updateService(serviceId: number, serviceData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${serviceId}`, serviceData);
  }

  deleteService(serviceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${serviceId}`);
  }
}
