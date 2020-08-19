import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSpecialiteService } from 'src/app/shared/api-specialite.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {

  itemsPerPage: number;
  currentPage: number;
  term;
  roles: any;
  roleId: any;
  roleId1: any;
  medecins: any;
  isSelectedMed: any;
  addMedForm: FormGroup;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  addUserForm: FormGroup;
  specialite: any;

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
    this.addMedForm = new FormGroup({

      qualification: new FormControl(''),
      specialite: new FormControl(''),
      experience: new FormControl(''),
      formation: new FormControl(''),
    })

    this.itemsPerPage = 6;
    this.currentPage = 1;

  }

  ngOnInit(): void {
    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
      for (const role of this.roles) {
        if (role.role == "Medecin" || role.role == "medecin") {
          this.roleId = role['@id'];
          this.roleId1 = role.id;
        }
      }
      this.apiAuthService.getUserByRole(this.roleId1).subscribe((res: any) => {
        this.medecins = res['hydra:member'];
      });
    });

    this.apiAuthService.getSpecialite().subscribe((res: any) => {
      this.specialite = res['hydra:member'];
    });
  }

  addUser() {

    this.addUserForm.addControl('roles', new FormControl(this.roleId, Validators.required));
    this.apiAuthService.addUser(this.addUserForm.value).subscribe((res: any) => {
      this.addMedForm.addControl('user', new FormControl(res['@id'], Validators.required));
      this.apiAuthService.addMedecin(this.addMedForm.value).subscribe((res: any) => {
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

  setSelectedMed(med) {
    this.isSelectedMed = med;
  }

  viewProfile(id) {
    this.apiAuthService.getUserById(id).subscribe((res: any) => {
      this.router.navigate(['/superAdmin/medecin', res.id]);
    });
  }

  deleteMed() {
    this.apiAuthService.deleteUser(this.isSelectedMed.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
}
