import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DoctorSearchComponent } from './patient/doctor-search/doctor-search.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { MedecinComponent } from './medecin/medecin.component';
import { PatientComponent } from './patient/patient.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AddSecretaireComponent } from './medecin/add-secretaire/add-secretaire.component';
import { SecretaireComponent } from './secretaire/secretaire.component';
import { AddRdvComponent } from './secretaire/add-rdv/add-rdv.component';
import { ConsultationComponent } from './medecin/consultation/consultation.component';
import { GestionConsultationComponent } from './medecin/gestion-consultation/gestion-consultation.component';

const routes: Routes = [
  {
    path: 'medecin',
    component: MedecinComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gestionSecretaires', component: AddSecretaireComponent ,canActivate: [AuthGuard]},
      { path: 'rendezVous', component: ConsultationComponent ,canActivate: [AuthGuard]},
      { path: 'consultation/:id', component:GestionConsultationComponent ,canActivate: [AuthGuard]},
      //{ path: '', redirectTo: 'register', pathMatch: 'full' },
    ]
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: 'home', component: PatientComponent },
       { path: 'searchDoctor', component: DoctorSearchComponent },
      //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  {
    path: 'secretaire',
    component: SecretaireComponent,
    canActivate: [AuthGuard],
    children: [

    { path: 'rdv', component: AddRdvComponent ,canActivate: [AuthGuard]},
      //{ path: '', redirectTo: 'register', pathMatch: 'full' },
    ]
  },
  { path: 'medecin/register', component: RegisterComponent },
  { path: 'patient/register', component: RegisterPatientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
