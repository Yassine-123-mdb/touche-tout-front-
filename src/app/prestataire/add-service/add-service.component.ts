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
  successMessage: string | null = null;
  errorMessage: string | null = null;
  previewImage: string | null = null;
  selectedFile: File | null = null;

  categories: string[] = ['Nettoyage', 'Jardinage', 'Plomberie', 'Électricité', 'Informatique']; // Exemple de catégories

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
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe((data: any) => {
      this.services = data;
    });
  }

  addService(): void {
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

  deleteService(serviceId: number): void {
    this.serviceService.deleteService(serviceId).subscribe(() => {
      this.loadServices();
    });
  }
}