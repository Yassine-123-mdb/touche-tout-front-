import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonServiceService } from '../../service/mon-service.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = [];
  isEditing = false;
  editingServiceId: string | null = null;
  categories: string[] = ['Nettoyage', 'Jardinage', 'Plomberie', 'Électricité', 'Informatique'];

  constructor(private fb: FormBuilder, private serviceService: MonServiceService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadServices();
  }

  initForm(): void {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      duration: [''],
      notes: [''],
      image: ['']
    });
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe((data: any) => {
      this.services = data;
    });
  }

  saveService(): void {
    const serviceData = this.serviceForm.value;

    if (this.isEditing && this.editingServiceId) {
      this.serviceService.updateService(this.editingServiceId, serviceData).subscribe(() => {
        this.isEditing = false;
        this.editingServiceId = null;
        this.serviceForm.reset();
        this.loadServices();
      });
    } else {
      this.serviceService.addService(serviceData).subscribe(() => {
        this.serviceForm.reset();
        this.loadServices();
      });
    }
  }

  editService(service: any): void {
    this.isEditing = true;
    this.editingServiceId = service.id;
    this.serviceForm.patchValue(service);
  }

  deleteService(serviceId: string): void {
    this.serviceService.deleteService(serviceId).subscribe(
      (response) => {
        console.log(response); // Affiche le message de succès
        this.loadServices();
      },
      (error) => {
        console.error('Erreur de suppression', error);
      }
    );
  }

}
