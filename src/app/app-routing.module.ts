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
import { ProfileComponent } from './medecin/profile/profile.component';
import { ProfilePatientComponent } from './patient/profile-patient/profile-patient.component';
import { ProfileSecretaireComponent } from './secretaire/profile-secretaire/profile-secretaire.component';
import { RendezVousListComponent } from './patient/rendez-vous-list/rendez-vous-list.component';
import { DossierMedicalComponent } from './patient/dossier-medical/dossier-medical.component';
import { ConsultationByPatientComponent } from './patient/consultation-by-patient/consultation-by-patient.component';
import { ListePatientsComponent } from './medecin/liste-patients/liste-patients.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './admin/role/role.component';
import { SpecialiteComponent } from './admin/specialite/specialite.component';
import { TypeAnalyseComponent } from './admin/type-analyse/type-analyse.component';
import { TypeRadioComponent } from './admin/type-radio/type-radio.component';


const routes: Routes = [
  {
    path: 'medecin',
    component: MedecinComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'patients', component: ListePatientsComponent, canActivate: [AuthGuard] },
      { path: 'secretaires', component: AddSecretaireComponent, canActivate: [AuthGuard] },
      { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'rendezVous', component: ConsultationComponent, canActivate: [AuthGuard] },
      { path: 'consultation/:id', component: GestionConsultationComponent, canActivate: [AuthGuard] },
      //{ path: '', redirectTo: 'register', pathMatch: 'full' },
    ]
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: 'home', component: PatientComponent },
      { path: 'profil', component: ProfilePatientComponent, canActivate: [AuthGuard] },
      { path: 'searchDoctor', component: DoctorSearchComponent },
      { path: 'rendezVous', component: RendezVousListComponent, canActivate: [AuthGuard] },
      { path: 'dossierMedical', component: DossierMedicalComponent, canActivate: [AuthGuard] },
      { path: 'consultation/:id', component: ConsultationByPatientComponent, canActivate: [AuthGuard] },
      //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  {
    path: 'secretaire',
    component: SecretaireComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profil', component: ProfileSecretaireComponent, canActivate: [AuthGuard] },
      { path: 'rendezVous', component: AddRdvComponent, canActivate: [AuthGuard] },
      //{ path: '', redirectTo: 'register', pathMatch: 'full' },
    ]
  },

  { path: 'admin', component: AdminComponent },
  { path: 'admin/roles', component: RoleComponent },
  { path: 'admin/specialites', component: SpecialiteComponent },
  { path: 'admin/typesAnalyses', component: TypeAnalyseComponent },
  { path: 'admin/typesImagesRadios', component: TypeRadioComponent },
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
