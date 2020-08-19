import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';
import { ApiSpecialiteService } from '../shared/api-specialite.service';
import { ApiMedecinService } from '../shared/api-medecin.service';
import { ApiSecretaireService } from '../shared/api-secretaire.service';
import { ApiPatientService } from '../shared/api-patient.service';
import { ApiRadioService } from '../shared/api-radio.service';
import { ApiAnalyseService } from '../shared/api-analyse.service';
import { ApiMedicamentService } from '../shared/api-medicament.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users = [];
  roles = [];
  specialites = [];
  secretaires = [];
  meds = [];
  patients = [];
  typesRadio = [];
  typesAnalyse = [];
  medicaments = [];

  constructor(private apiService: ApiAuthService, private apiSpecialiteService: ApiSpecialiteService,
    private apiMedService: ApiMedecinService, private apiSecService: ApiSecretaireService,
    private apiPatientService: ApiPatientService, private apiRadioService: ApiRadioService,
    private apiAnalyseService: ApiAnalyseService, private apiMedicamentsService: ApiMedicamentService,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((res: any) => {
      this.users = res['hydra:member'];
    });

    this.apiSecService.getSecretaires().subscribe((res: any) => {
      this.secretaires = res['hydra:member'];
    });

    this.apiMedService.getMedecins().subscribe((res: any) => {
      this.meds = res['hydra:member'];
    });

    this.apiPatientService.getPatients().subscribe((res: any) => {
      this.patients = res['hydra:member'];
    });

    this.apiService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
    });

    this.apiSpecialiteService.getSpecialites().subscribe((res: any) => {
      this.specialites = res['hydra:member'];
    });

    this.apiRadioService.getTypesRadios().subscribe((res: any) => {
      this.typesRadio = res['hydra:member'];
    });

    this.apiAnalyseService.getTypeAnalyse().subscribe((res: any) => {
      this.typesAnalyse = res['hydra:member'];
    });

    this.apiMedicamentsService.getMedicaments().subscribe((res: any) => {
      this.medicaments = res['hydra:member'];
    });
  }

}
