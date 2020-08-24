import { Component, OnInit } from '@angular/core';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiSecretaireService } from 'src/app/shared/api-secretaire.service';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: ['./add-rdv.component.css']
})
export class AddRdvComponent implements OnInit {

  addRdvForm: FormGroup;
  medecinId;
  rdvs = [];
  selectedRdv;
  etatToEdit;
  selectedRdvHeure;
  users;
  roles;
  roleId: any;
  selectedUser: any;
  itemsPerPage: number;
  currentPage: number;
  term;
  patient: any;
  patientDetail = [];
  patients = [];
  tab = [];
  table = [];
  patientNom = [];
  userp = [];
  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiPatientService: ApiPatientService, private apiRdvService: ApiRdvService, private apiSecretaireService: ApiSecretaireService) {

    this.addRdvForm = new FormGroup({

      date: new FormControl(''),
      heure: new FormControl(''),
      patient: new FormControl(''),

    });

    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.patients = [];
    this.userp = [];
    this.patientNom = [];
    this.tab = [];
    this.table = [];
    this.apiSecretaireService.getSecretaireByUserId(localStorage.getItem('userId').substring(11)).subscribe((res: any) => {
      this.medecinId = res.medecinId


      this.apiRdvService.getAllRdvsByMedecin(this.medecinId.substring(14)).subscribe((res: any) => {
        this.rdvs = res['hydra:member'];
        for (let j = 0; j < this.rdvs.length; j++) {
          this.tab.push(this.rdvs[j].patient.substring(14));
        }
        for (let i = 0; i < this.tab.length; i++) {
          this.apiPatientService.getPatientById(this.tab[i]).subscribe((res: any) => {
            this.userp.push(res.user.substring(11));
            this.apiAuthService.getUserById(this.userp[i]).subscribe((res: any) => {
              this.patientNom.push(res.prenom + ' ' + res.nom);
            });
          });
        }
      });
    });

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
      for (const role of this.roles) {
        if (role.role == "Patient" || role.role == "patient") {
          this.roleId = role.id;
        }
      }
      this.apiAuthService.getUserByRole(this.roleId).subscribe((res: any) => {
        this.users = res['hydra:member'];
      });
    });

    this.apiPatientService.getPatients().subscribe((res: any) => {
      this.patients = res['hydra:member'];
      for (let j = 0; j < this.patients.length; j++) {
        this.table.push(this.patients[j].user.substring(11));
      }
      console.log(this.table)
      for (let i = 0; i < this.table.length; i++) {
        this.apiAuthService.getUserById(this.table[i]).subscribe((res: any) => {
          this.patientDetail.push(res.prenom + ' ' + res.nom);
          console.log(this.patientDetail)
        });
      }
    });
  }

  addRdv() {
    console.warn(this.addRdvForm.value);
    console.log(this.addRdvForm.valid);
    if (!this.addRdvForm.valid) {
    } else {
      this.addRdvForm.addControl('medecin', new FormControl(this.medecinId));
      console.warn(this.addRdvForm.value)
      this.apiRdvService.addRdv(this.addRdvForm.value).subscribe((res: any) => {
        this.ngOnInit();
      });
    }
  }

  setSelectedRdv(rdv) {
    this.selectedRdv = rdv;
    this.etatToEdit = rdv.etat;
  }

  editRdv(dat, heur) {
    var body = {
      date: dat,
      heure: heur,
      etat: this.etatToEdit,
    }
    this.apiRdvService.editRdv(this.selectedRdv.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteRdv(id) {
    this.apiRdvService.deleteRdv(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }

  setEtat(etat: HTMLElement) {
    var etat1 = etat.innerHTML;
    if (etat1 == "Non consulté")
      this.etatToEdit = "Non consulté";
    if (etat1 == "Consulté")
      this.etatToEdit = "Consulté";
    if (etat1 == "Annulé")
      this.etatToEdit = "Annulé";

  }

  getEtat(etat1) {
    if (etat1 == "Non consulté")
      return "Non consulté";
    if (etat1 == "Consulté")
      return "Consulté";
    if (etat1 == "Annulé")
      return "Annulé";
  }
}