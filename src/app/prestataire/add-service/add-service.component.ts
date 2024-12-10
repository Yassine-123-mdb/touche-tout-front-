import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonServiceService } from '../../service/mon-service.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  serviceForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  previewImage: string | null = null;
  categories: string[] = ['Nettoyage', 'Jardinage', 'Plomberie', 'Électricité', 'Informatique'];
  selectedFile: File | null = null;
  isEditing = false;
  editingServiceId: number | null = null;
  services: any[] = []; // Stocker les services pour affichage

  constructor(private fb: FormBuilder, private serviceService: MonServiceService) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      duration: [''],
      notes: [''],
      image: ['']
    });
    this.loadServices();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addService(): void {
    if (this.serviceForm.valid) {
      const formData = new FormData();
      formData.append('title', this.serviceForm.get('title')?.value);
      formData.append('description', this.serviceForm.get('description')?.value);
      formData.append('price', this.serviceForm.get('price')?.value);
      formData.append('category', this.serviceForm.get('category')?.value);
      formData.append('duration', this.serviceForm.get('duration')?.value || '');
      formData.append('notes', this.serviceForm.get('notes')?.value || '');
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditing && this.editingServiceId) {
        this.serviceService.updateService(this.editingServiceId, formData).subscribe(() => {
          this.successMessage = 'Service mis à jour avec succès';
          this.resetForm();
          this.loadServices();
        }, error => {
          console.error('Erreur lors de la mise à jour du service', error);
          this.errorMessage = 'Erreur lors de la mise à jour du service';
        });
      } else {
        this.serviceService.addService(formData).subscribe(() => {
          this.successMessage = 'Service ajouté avec succès';
          this.resetForm();
          this.loadServices();
        }, error => {
          console.error('Erreur lors de l\'ajout du service', error);
          this.errorMessage = 'Erreur lors de l\'ajout du service';
        });
      }
    }
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(data => this.services = data);
  }

  resetForm(): void {
    this.serviceForm.reset();
    this.selectedFile = null;
    this.previewImage = null;
    this.isEditing = false;
    this.editingServiceId = null;
  }

  editService(service: any): void {
    this.isEditing = true;
    this.editingServiceId = service.id;
    this.serviceForm.patchValue(service);
    this.previewImage = service.image; // Prévisualiser l'image existante
  }

  deleteService(serviceId: number): void {
    this.serviceService.deleteService(serviceId).subscribe(() => {
      this.successMessage = 'Service supprimé avec succès';
      this.loadServices();
    }, error => {
      console.error('Erreur lors de la suppression du service', error);
      this.errorMessage = 'Erreur lors de la suppression du service';
    });
  }
}
