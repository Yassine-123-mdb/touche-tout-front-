import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonServiceService } from '../../service/mon-service.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  services: any[] = [];
  filteredServices: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  maxPrice: number = 0;
  maxPriceFilter: number = 0;

  constructor(private monService: MonServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.monService.getAllServices().subscribe(
      (data) => {
        this.services = data;
        this.filteredServices = data;
        this.categories = this.getCategories(data);
        this.maxPrice = Math.max(...data.map(service => service.price));
        this.maxPriceFilter = this.maxPrice;
      },
      (error) => console.error('Erreur lors du chargement des services :', error)
    );
  }

  getCategories(services: any[]): string[] {
    return [...new Set(services.map(service => service.category))];
  }

  filterServices(): void {
    this.filteredServices = this.services.filter(service => {
      return (
        (this.selectedCategory ? service.category === this.selectedCategory : true) &&
        service.price <= this.maxPriceFilter
      );
    });
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.maxPriceFilter = this.maxPrice;
    this.filterServices();
  }

  openReservation(service: any): void {
    this.router.navigate(['client', 'reserveclient'], { state: { service } });
  }
}
