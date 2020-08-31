import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  RegisterForm: FormGroup;
  roles;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  roleName;
  RegisterFormMedecin: FormGroup;
  specialite: any;
  roleId: any;
  RegistForm: FormGroup;
  RegisterFormPatient: FormGroup;
  roleIdPatient: any;

  constructor(private router: Router, private apiAuthService: ApiAuthService, 
    private translate: TranslateService) {
      
    translate.setDefaultLang('fr');
    this.RegisterForm = new FormGroup({

      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      telephone: new FormControl(''),
      genre: new FormControl(''),
      langue: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.RegisterFormMedecin = new FormGroup({

      qualification: new FormControl(''),
      formation: new FormControl(''),
      specialite: new FormControl(''),
      experience: new FormControl(''),
    });

    this.RegistForm = new FormGroup({

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
      dateNaiss: new FormControl(''),
      profession: new FormControl(''),
    })

  }

  ngOnInit(): void {

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];

      for (const role of this.roles) {

        if (role.role == "Medecin" || role.role == "medecin") {
          this.roleId = role["@id"];
        }
        if (role.role == "Patient" || role.role == "patient") {
          this.roleIdPatient = role["@id"];
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
          this.router.navigate(['/medecin/rendezVous'])
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
  addPatient() {

    this.RegistForm.addControl('roles', new FormControl(this.roleIdPatient, Validators.required));
    this.apiAuthService.addUser(this.RegistForm.value).subscribe((res: any) => {
      localStorage.setItem("token", res['email']);
      localStorage.setItem('userId', res['@id']);

      this.RegisterFormPatient.addControl('user', new FormControl(res['@id'], Validators.required));
      this.apiAuthService.addPatient(this.RegisterFormPatient.value).subscribe((res: any) => {
        localStorage.setItem('isPatient', 'true');
        localStorage.setItem('id', res['@id']);
        this.router.navigate(['/patient/rendezVous'])
          .then(() => {
            window.location.reload();
          });
      });
    },
      error => {
        console.error();
      });
  }

  useLanguage(language: string) {
    this.translate.use(language);
}
}

