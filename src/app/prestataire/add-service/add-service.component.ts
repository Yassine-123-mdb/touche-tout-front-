import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonServiceService } from '../../service/mon-service.service'; // Importez le service Angular
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
  categories: string[] = ['Nettoyage', 'Jardinage', 'Plomberie', 'Électricité', 'Informatique']; // Exemple de catégories
  isEditing = false;
  editingServiceId: number | null = null;
  services: any[] = [];
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
  }

  // Méthode pour gérer la sélection de l'image
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.serviceForm.patchValue({ image: base64Image }); // Ajoutez l'image au formulaire
        this.previewImage = base64Image; // Prévisualiser l'image
      };
      reader.readAsDataURL(file); // Lire le fichier en Base64
    }
  }
  

  // Méthode pour soumettre le formulaire
 addService(): void {
  if (this.serviceForm.valid) {
    const serviceData = this.serviceForm.value;
    this.serviceService.addService(serviceData).subscribe(response => {
      this.successMessage = 'Service ajouté avec succès';
      this.errorMessage = null;
      this.serviceForm.reset();
      this.previewImage = null;
    }, error => {
      console.error('Erreur lors de l\'ajout du service', error);
      this.errorMessage = 'Erreur lors de l\'ajout du service';
      this.successMessage = null;
    });
  }
}
loadServices(): void {
  this.serviceService.getServices().subscribe(data => this.services = data);
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
