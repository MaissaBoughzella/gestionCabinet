import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { MedecinComponent } from './medecin/medecin.component';
import { PatientComponent } from './patient/patient.component';
import { AddSecretaireComponent } from './medecin/add-secretaire/add-secretaire.component';
import { SecretaireComponent } from './secretaire/secretaire.component';
import { AddRdvComponent } from './secretaire/add-rdv/add-rdv.component';
import { ConsultationComponent } from './medecin/consultation/consultation.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { GestionConsultationComponent } from './medecin/gestion-consultation/gestion-consultation.component';
import { OrdonnanceComponent } from './medecin/ordonnance/ordonnance.component';
import { ProfileComponent } from './medecin/profile/profile.component';
import { ProfilePatientComponent } from './patient/profile-patient/profile-patient.component';
import { ProfileSecretaireComponent } from './secretaire/profile-secretaire/profile-secretaire.component';
import { RendezVousListComponent } from './patient/rendez-vous-list/rendez-vous-list.component';
import { ConsultationByPatientComponent } from './patient/consultation-by-patient/consultation-by-patient.component';
import { OrdonnancePatientComponent } from './patient/ordonnance-patient/ordonnance-patient.component';
import { ListePatientsComponent } from './medecin/liste-patients/liste-patients.component'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminComponent } from './admin/admin.component';
import { TypeAnalyseComponent } from './admin/type-analyse/type-analyse.component';
import { TypeRadioComponent } from './admin/type-radio/type-radio.component';
import { RoleComponent } from './admin/role/role.component';
import { SpecialiteComponent } from './admin/specialite/specialite.component';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
import { MedecinsComponent } from './admin/medecins/medecins.component';
import { MedecinByIdComponent } from './admin/medecin-by-id/medecin-by-id.component';
import { MedicamentsComponent } from './admin/medicaments/medicaments.component';
import { PatientsComponent } from './admin/patients/patients.component';
import { PatientByIdComponent } from './admin/patient-by-id/patient-by-id.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterPatientComponent,
    MedecinComponent,
    PatientComponent,
    AddSecretaireComponent,
    SecretaireComponent,
    AddRdvComponent,
    ConsultationComponent,
    GestionConsultationComponent,
    OrdonnanceComponent,
    ProfileComponent,
    ProfilePatientComponent,
    ProfileSecretaireComponent,
    RendezVousListComponent,
    ConsultationByPatientComponent,
    OrdonnancePatientComponent,
    ListePatientsComponent,
    AdminComponent,
    TypeAnalyseComponent,
    TypeRadioComponent,
    RoleComponent,
    SpecialiteComponent,
    ProfilAdminComponent,
    MedecinsComponent,
    MedecinByIdComponent,
    MedicamentsComponent,
    PatientsComponent,
    PatientByIdComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function TRANSLATE(str: string) {
  return str;
}