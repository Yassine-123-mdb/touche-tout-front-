import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Déjà importé
import { ReactiveFormsModule } from '@angular/forms';  // Ajoutez ceci pour les formulaires réactifs

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { PrestataireComponent } from './prestataire/prestataire/prestataire.component';
import { NavPresComponent } from './prestataire/nav-pres/nav-pres.component';
import { AddServiceComponent } from './prestataire/add-service/add-service.component';
import { ClientComponent } from './client/client/client.component';
import { ReservationComponent } from './prestataire/reservation/reservation.component';
import { PrestataireLayoutComponent } from './prestataire/prestataire-layout/prestataire-layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../app/service/jwt.interceptor';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { ReservationClientComponent } from './client/reservation-client/reservation-client.component';
import { RechercheComponent } from './recherche/recherche.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    VerifEmailComponent,
    PrestataireComponent,
    NavPresComponent,
    AddServiceComponent,
    ClientComponent,
    ReservationComponent,
    PrestataireLayoutComponent,
    DashboardComponent,
    ClientLayoutComponent,
    ReservationClientComponent,
    RechercheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,  // Pour ngModel
    ReactiveFormsModule,  // Pour formGroup et les formulaires réactifs
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
