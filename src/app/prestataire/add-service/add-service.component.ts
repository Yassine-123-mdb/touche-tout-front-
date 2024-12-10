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
  selectedFile: File | null = null;
  isEditing = false;
  editingServiceId: string | null = null;

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
    this.serviceService.getServices().subscribe(data => this.services = data);
  }

  saveService(): void {
    const formData = new FormData();
    Object.keys(this.serviceForm.controls).forEach(key => {
      if (key !== 'image') {
        formData.append(key, this.serviceForm.get(key)!.value);
      }
    });
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.isEditing && this.editingServiceId) {
      this.serviceService.updateService(this.editingServiceId, formData).subscribe(() => {
        this.resetForm();
        this.loadServices();
      });
    } else {
      this.serviceService.addService(formData).subscribe(() => {
        this.resetForm();
        this.loadServices();
      });
    }
  }

  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  resetForm(): void {
    this.serviceForm.reset();
    this.selectedFile = null;
    this.isEditing = false;
    this.editingServiceId = null;
  }

  editService(service: any): void {
    this.isEditing = true;
    this.editingServiceId = service.id;
    this.serviceForm.patchValue(service);
  }

  deleteService(serviceId: string): void {
    this.serviceService.deleteService(serviceId).subscribe(() => this.loadServices());
  }
}
