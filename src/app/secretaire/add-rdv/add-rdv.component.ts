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
  patients;
  medecinId;
  rdvs = [];
  selectedRdv;
  config: { itemsPerPage: number; currentPage: number };
  etatToEdit;
  selectedRdvHeure;
  users;
  roles;
  roleId: any;
  selectedUser: any;

  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiPatientService: ApiPatientService, private apiRdvService: ApiRdvService, private apiSecretaireService: ApiSecretaireService) {

    this.addRdvForm = new FormGroup({

      date: new FormControl(''),
      heure: new FormControl(''),
      patient: new FormControl(''),

    });

    this.config = {
      itemsPerPage: 2,
      currentPage: 1,
    };
  }

  ngOnInit(): void {

    this.apiSecretaireService.getSecretaireByUserId(localStorage.getItem('userId').substring(11)).subscribe((res: any) => {
      this.medecinId = res.medecinId
    });

    this.apiRdvService.getRdvs().subscribe((res: any) => {
      this.rdvs = res['hydra:member'];
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
        //console.log(this.users);
      });
    });
    
    this.apiPatientService.getPatientByUserId(this.selectedUser.id).subscribe((res: any) => {
        this.patients = res
        console.log(res)
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

  setSelectedUser(user) {
    this.selectedUser = user;
    console.log(this.selectedUser)
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
    this.config.currentPage = event;
  }

  // filter() {
  //   var dates = [];
  //   var filtered = [];

  //   for (let i = 0; i < this.rdvs.length; i++) {
  //     dates[i] = this.rdvs[i].date;
  //   }
  //   dates.sort();
  //   for (let j = 0; j < dates.length; j++) {
  //     for (let i = 0; i < this.rdvs.length; i++) {
  //       if (this.rdvs[i].date == dates[j]) {
  //         filtered.push(this.rdvs[i]);
  //       }
  //     }
  //   }
  //   this.rdvs = filtered;
  // }

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