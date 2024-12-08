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
  confirmPassword!: string; // Propriété pour stocker la confirmation du mot de passe
  myForm!: FormGroup;
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
        tel: ['', [Validators.required]],
        siret: ['', [Validators.required]],
        role: ['', [Validators.required]], // Ajout du champ rôle
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword
      ? null
      : { notMatching: true }; // Ajout d'une erreur personnalisée
  }

  onRegister(): void {
    if (this.myForm.invalid) {
      this.err = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    // Assurez-vous que le rôle est assigné à l'utilisateur
    this.user.roles = this.myForm.get('role')?.value;
    console.log(this.user);
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
