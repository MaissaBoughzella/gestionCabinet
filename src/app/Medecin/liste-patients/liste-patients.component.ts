import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css']
})
export class ListePatientsComponent implements OnInit {
  patients = [];
  itemsPerPage: number;
  currentPage: number;
  table = [];
  patientDetail = [];
  rdvs = [];
  term;
  RegisterForm: FormGroup;
  roles;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  roleName;
  RegisterFormPatient: FormGroup;
  specialite: any;
  roleId: any;
  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiRdvService: ApiRdvService,
    private apiPatientService: ApiPatientService) {
    this.itemsPerPage = 10;
    this.currentPage = 1;

    // this.RegisterForm = new FormGroup({

    //   nom: new FormControl('', [Validators.required]),
    //   prenom: new FormControl('', [Validators.required]),
    //   adresse: new FormControl(''),
    //   telephone: new FormControl(''),
    //   genre: new FormControl(''),
    //   langue: new FormControl(''),
    //   email: new FormControl('', [Validators.email, Validators.required]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8)])
    // });
    // this.RegisterFormPatient = new FormGroup({

    //   profession: new FormControl(''),
    //   dateNaiss: new FormControl(''),

    // });

  }

  ngOnInit(): void {
    this.patients = [];
    this.patientDetail = [];
    this.table = [];
    this.rdvs = [];
    let medId = localStorage.getItem('idMed').substring(14);
    this.apiRdvService.getAllRdvsByMedecin(medId).subscribe((res: any) => {
      this.rdvs = res['hydra:member'];
      let exists = false;
      for (let i = 0; i < this.rdvs.length; i++) {
        this.patients.push(this.rdvs[i].patient)
        for (let k = 0; k < this.patients.length; k++) {
          this.apiPatientService.getPatientById(this.patients[k].substring(14)).subscribe((res: any) => {
            this.table.push(res.user);
            for (let m = 0; m < this.table.length; m++) {
              this.apiAuthService.getUserById(this.table[m].substring(11)).subscribe((res: any) => {
                for (let n = 0; n < this.patientDetail.length; n++) {
                  if (res.id == this.patientDetail[n].id) {
                    exists = true;
                  }
                }
                if (!exists) {
                  this.patientDetail.push(res);
                  console.log(this.patientDetail)
                }
              });
            }
          });
        }
      }
    });
    // this.apiAuthService.getRoles().subscribe((res: any) => {
    //   this.roles = res['hydra:member'];

    //   for (const role of this.roles) {

    //     if (role.role == "Patient" || role.role == "patient") {
    //       this.roleId = role["@id"];
    //       console.log(this.roleId);

    //     }
    //   }

    // });
  }
  // addUser() {

  //   if (!this.RegisterForm.valid && !this.RegisterFormPatient.valid) {
  //   } else {

  //     this.RegisterForm.addControl('roles', new FormControl(this.roleId, Validators.required));

  //     this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
  //       localStorage.setItem("token", res['email']);
  //       localStorage.setItem('userId', res['@id']);
  //       this.RegisterFormPatient.addControl('user', new FormControl(res['@id'], Validators.required));
  //       this.apiAuthService.addPatient(this.RegisterFormPatient.value).subscribe((res: any) => {
  //         this.ngOnInit;
  //       });
  //     },
  //       error => {
  //         console.error();
  //       });
  //   }
  // }

  pageChanged(event) {
    this.currentPage = event;
  }

}
