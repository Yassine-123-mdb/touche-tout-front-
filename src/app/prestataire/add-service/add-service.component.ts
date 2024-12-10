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
  selectedFile: File | null = null;
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

  saveService(): void {
    const serviceData = this.serviceForm.value;

    const formData = new FormData();
    formData.append('title', serviceData.title);
    formData.append('description', serviceData.description);
    formData.append('price', serviceData.price);
    formData.append('category', serviceData.category);
    formData.append('duration', serviceData.duration || '');
    formData.append('notes', serviceData.notes || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing && this.editingServiceId) {
      this.serviceService.updateService(this.editingServiceId, formData).subscribe(() => {
        this.isEditing = false;
        this.editingServiceId = null;
        this.serviceForm.reset();
        this.loadServices();
      });
    } else {
      this.serviceService.addService(formData).subscribe(() => {
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
