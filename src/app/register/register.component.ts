import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  roles;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  roleName;
  RegisterFormMedecin: FormGroup;
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
    this.RegisterFormMedecin = new FormGroup({

      qualification: new FormControl(''),
      experience: new FormControl(''),
      formation: new FormControl(''),
      specialite: new FormControl(''),

    })

  }

  ngOnInit(): void {

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];

      for (const role of this.roles) {

        if (role.role == "Medecin" || role.role == "medecin") {
          this.roleId = role["@id"];
          console.log(this.roleId);
        }
      }
      

    });

    this.apiAuthService.getSpecialite().subscribe((res: any) => {
      this.specialite = res['hydra:member'];
    });
  }

  addUser() {
    // console.warn(this.RegisterForm.value);
    // console.log(this.RegisterForm.valid);
    // console.log("hi")
    // console.warn(this.RegisterFormMedecin.value);
    // console.log(this.RegisterFormMedecin.valid);
    if (!this.RegisterForm.valid && !this.RegisterFormMedecin.valid) {
    } else {
      this.RegisterForm.addControl('roles', new FormControl(this.roleId, Validators.required));
      this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
        localStorage.setItem("token", res['email']);
        localStorage.setItem('userId', res['@id']);

        this.RegisterFormMedecin.addControl('user', new FormControl(res['@id'], Validators.required));
        this.apiAuthService.addMedecin(this.RegisterFormMedecin.value).subscribe((res: any) => {
          localStorage.setItem('isMedecin', 'true');
          localStorage.setItem('id', res['@id']);
          this.router.navigate(['/medecin'])
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
