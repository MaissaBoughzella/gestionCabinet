import { Component, OnInit } from '@angular/core';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiSecretaireService } from 'src/app/shared/api-secretaire.service';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: ['./add-rdv.component.css']
})
export class AddRdvComponent implements OnInit {

  addRdvForm: FormGroup;
  patients;
  medecinId;
  rdvs;
  selectedRdv;

  constructor(private router: Router, private apiPatientService: ApiPatientService, private apiRdvService: ApiRdvService, private apiSecretaireService: ApiSecretaireService) {

    this.addRdvForm = new FormGroup({

      date: new FormControl(''),
      heure: new FormControl(''),
      patient: new FormControl(''),

    })
  }

  ngOnInit(): void {

    this.apiRdvService.getRdvs().subscribe((res: any) => {
      this.rdvs = res['hydra:member'];
    });

    this.apiPatientService.getPatients().subscribe((res: any) => {
      this.patients = res['hydra:member']
    });

    this.apiSecretaireService.getSecretaireByUserId(localStorage.getItem('userId').substring(11)).subscribe((res: any) => {
      this.medecinId = res.medecinId
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
  }

  editRdv(dat, heur) {
    var body = {
      date: dat,
      heure: heur,
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
}