import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {


  RegisterForm: FormGroup;
  roles;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  roleName;
  RegisterFormPatient: FormGroup;
  specialite: any;
  roleId: any;

  constructor(private router: Router, private apiAuthService: ApiAuthService) {
    this.RegisterForm = new FormGroup({

      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      telephone: new FormControl(''),
      genre: new FormControl(''),
      langue: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    this.RegisterFormPatient = new FormGroup({

      profession: new FormControl(''),
      dateNaiss: new FormControl(''),

    })

  }

  ngOnInit(): void {

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];

      for (const role of this.roles) {

        if (role.role == "Patient" || role.role == "patient") {
          this.roleId = role["@id"];
          console.log(this.roleId);
          
        }
      }

    });

  }

  addUser() {

    if (!this.RegisterForm.valid && !this.RegisterFormPatient.valid) {
    } else {
     
      this.RegisterForm.addControl('roles', new FormControl(this.roleId, Validators.required));

      this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
        localStorage.setItem("token", res['email']);
        localStorage.setItem('userId', res['@id']);
        this.RegisterFormPatient.addControl('user', new FormControl(res['@id'], Validators.required));
        this.apiAuthService.addPatient(this.RegisterFormPatient.value).subscribe((res: any) => {
          
          localStorage.setItem('isPatient', 'true');
          localStorage.setItem('id', res['@id']);
          this.router.navigate(['/patient'])
            .then(() => {
              window.location.reload();
            });
        });
      },
        error => {
          console.error();
        });
    }
  }
}