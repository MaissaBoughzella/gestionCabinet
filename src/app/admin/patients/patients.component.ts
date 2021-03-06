import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSpecialiteService } from 'src/app/shared/api-specialite.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  itemsPerPage: number;
  currentPage: number;
  term;
  roles: any;
  roleId: any;
  roleId1: any;
  patients: any;
  isSelectedPatient: any;
  addPatientForm: FormGroup;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  addUserForm: FormGroup;

  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiSpecialite: ApiSpecialiteService) {
    this.addUserForm = new FormGroup({

      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      telephone: new FormControl(''),
      genre: new FormControl(''),
      langue: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    this.addPatientForm = new FormGroup({

      dateNaiss: new FormControl(''),
      profession: new FormControl(''),
    })

    this.itemsPerPage = 6;
    this.currentPage = 1;

  }

  ngOnInit(): void {
    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
      for (const role of this.roles) {
        if (role.role == "Patient" || role.role == "patient") {
          this.roleId = role['@id'];
          this.roleId1 = role.id;
        }
      }
      this.apiAuthService.getUserByRole(this.roleId1).subscribe((res: any) => {
        this.patients = res['hydra:member'];
      });
    });

  }

  addUser() {

    this.addUserForm.addControl('roles', new FormControl(this.roleId, Validators.required));
    this.apiAuthService.addUser(this.addUserForm.value).subscribe((res: any) => {
      this.addPatientForm.addControl('user', new FormControl(res['@id'], Validators.required));
      this.apiAuthService.addPatient(this.addPatientForm.value).subscribe((res: any) => {
        this.ngOnInit();
      });
    },
      error => {
        console.error();
      });
  }

  pageChanged(event) {
    this.currentPage = event;
  }

  setSelectedpatient(patient) {
    this.isSelectedPatient = patient;
  }

  viewProfile(id) {
    this.apiAuthService.getUserById(id).subscribe((res: any) => {
      this.router.navigate(['/superAdmin/patient', res.id]);
    });
  }

  deletepatient() {
    this.apiAuthService.deleteUser(this.isSelectedPatient.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
}

