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

  constructor(private router: Router, private apiAuthService: ApiAuthService) {
    this.RegisterForm = new FormGroup({

      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      telephone: new FormControl(''),
      genre: new FormControl(''),
      langue: new FormControl(''),
      roles: new FormControl((''), [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    this.RegisterFormMedecin = new FormGroup({

      photo: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required]),
      experience: new FormControl(''),
      formation: new FormControl(''),
      specialité: new FormControl(''),
     
    })

  }

  ngOnInit(): void {

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
    });
  }

  addUser() {
    // console.warn(this.RegisterForm.value);
    // console.log(this.RegisterForm.valid);
    if (!this.RegisterForm.valid) {
    } else {
      this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
        var body = {
          user: res['@id']
        }
        var id = res.roles.substring(11);
        
        this.apiAuthService.getRoleById(id).subscribe((res: any) => {
        
        if (this.roleName == "Medecin" ||  this.roleName == "medecin") {
          this.apiAuthService.addMedecin(body).subscribe((res: any) => {
          });
        }
        else if (this.roleName == "Patient" ||this.roleName == "patient" ) {
          this.apiAuthService.addPatient(body).subscribe((res: any) => {
          });
        }
        else if (this.roleName == "Secretaire" || this.roleName == "secretaire" ){
          this.apiAuthService.addSecretaire(body).subscribe((res: any) => {
          });
        }
      });
      localStorage.setItem("token",res['email']);
      this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });     
    },
    error => {
      console.error();
  });
    }
  }
}
