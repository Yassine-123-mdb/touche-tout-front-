import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup;
  services: any[] = []; // Liste des services ajoutés
  categories = ['Ménage', 'Jardinage', 'Bricolage', 'Cours', 'Informatique'];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire avec des validations
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Méthode pour ajouter un service
  addService(): void {
    if (this.serviceForm.valid) {
      const newService = this.serviceForm.value;

      // Ajouter le service à la liste
      this.services.push(newService);

      // Réinitialiser le formulaire
      this.serviceForm.reset();

      // Afficher le message de succès
      this.successMessage = 'Service ajouté avec succès !';
      this.errorMessage = null;

      // Supprimer le message après 3 secondes
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }
}
