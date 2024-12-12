import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user = new User();
  myForm!: FormGroup;
  submitted = false; // Added flag for form submission
  err: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group(
      {
        prenom: ['', [Validators.required]],
        adress: ['', [Validators.required]],
        tel: ['', [Validators.required, this.numberValidator]],  // Added numberValidator
        siret: ['', [Validators.required, this.numberValidator]],  // Added numberValidator
        role: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordsMatchValidator,
      }
    );
  }

  // Validator to check if passwords match
  passwordsMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword
      ? null
      : { notMatching: true };
  }

  // Password strength validation
  passwordStrengthValidator(control: any): any {
    const password = control.value;
    if (password && !/(?=.*[A-Z])/.test(password)) {
      return { weakPassword: true };
    }
    return null;
  }

  // Custom validator to check if the value is a number
  numberValidator(control: any): any {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {  // Ensures the value is composed only of digits
      return { invalidNumber: true };
    }
    return null;
  }

  // Submit method
  onRegister(): void {
    this.submitted = true; // Set submitted flag to true

    if (this.myForm.invalid) {
      this.err = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    // Assign the user data
    this.user.roles = this.myForm.get('role')?.value;
    this.user.prenom = this.myForm.get('prenom')?.value;
    this.user.adress = this.myForm.get('adress')?.value;
    this.user.tel = this.myForm.get('tel')?.value;
    this.user.siret = this.myForm.get('siret')?.value;
    this.user.username = this.myForm.get('username')?.value;
    this.user.email = this.myForm.get('email')?.value;
    this.user.password = this.myForm.get('password')?.value;

    // Call the registration service
    this.authService.registerUser(this.user).subscribe({
      next: () => {
        this.authService.setRegistredUser(this.user);
        this.toastr.success('Veuillez confirmer votre email', 'Confirmation');
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        if (err.error && err.error.errorCode === 'USER_EMAIL_ALREADY_EXISTS') {
          this.err = 'Email déjà existant !';
        } else {
          this.err = 'Une erreur inconnue est survenue.';
        }
      },
    });
  }
}
