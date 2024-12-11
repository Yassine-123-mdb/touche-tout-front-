import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { PrestataireComponent } from './prestataire/prestataire/prestataire.component';
import { AddServiceComponent } from './prestataire/add-service/add-service.component';
import { ReservationComponent } from './prestataire/reservation/reservation.component';
import { PrestataireLayoutComponent } from './prestataire/prestataire-layout/prestataire-layout.component';
import { ClientComponent } from './client/client/client.component';
import { AuthGuard } from './verif-email/auth.guard';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { ReservationClientComponent } from './client/reservation-client/reservation-client.component';
import { ListServiceComponent } from './client/list-service/list-service.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent },


  // Groupe des routes Prestataire
  {
    path: 'prestataire',
    component: PrestataireLayoutComponent,canActivate: [AuthGuard],
    children: [
      { path: '', component: PrestataireComponent }, // Tableau de bord du prestataire
      { path: 'addService', component: AddServiceComponent },
      { path: 'reservation', component: ReservationComponent },
    ],
  },
  {
    path: 'client',
    component: ClientLayoutComponent,canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'listService', component: ListServiceComponent },
      { path: 'reserveclient', component: ReservationClientComponent },
    ],
  },

  // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }