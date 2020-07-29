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
import { DoctorSearchComponent } from './patient/doctor-search/doctor-search.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { MedecinComponent } from './medecin/medecin.component';
import { PatientComponent } from './patient/patient.component';
import { AddSecretaireComponent } from './medecin/add-secretaire/add-secretaire.component';
import { SecretaireComponent } from './secretaire/secretaire.component';
import { AddRdvComponent } from './secretaire/add-rdv/add-rdv.component';
import { ConsultationComponent } from './medecin/consultation/consultation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DoctorSearchComponent,
    RegisterPatientComponent,
    MedecinComponent,
    PatientComponent,
    AddSecretaireComponent,
    SecretaireComponent,
    AddRdvComponent,
    ConsultationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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