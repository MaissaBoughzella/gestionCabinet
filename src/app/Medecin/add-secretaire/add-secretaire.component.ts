import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-add-secretaire',
  templateUrl: './add-secretaire.component.html',
  styleUrls: ['./add-secretaire.component.css']
})
export class AddSecretaireComponent implements OnInit {

  RegisterForm: FormGroup;
  roles;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemnad'];
  roleName;
  specialite: any;
  roleId: any;
  addSecretaireForm: FormGroup;

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
    this.addSecretaireForm = new FormGroup({
    })

  }

  ngOnInit(): void {
    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
      for (const role of this.roles) {
        if (role.role == "Secretaire" || role.role == "secretaire") {
          this.roleId = role["@id"];
        }
      }
    });
    var id = localStorage.getItem('id');
    console.log(id)
  }

  addUser() {
    if (!this.RegisterForm.valid && !this.addSecretaireForm.valid) {
    } else {
      this.RegisterForm.addControl('roles', new FormControl(this.roleId, Validators.required));
      this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
        this.addSecretaireForm.addControl('user', new FormControl(res['@id'], Validators.required));
        this.addSecretaireForm.addControl('medecinId', new FormControl(localStorage.getItem('id'), Validators.required));
       
        this.apiAuthService.addSecretaire(this.addSecretaireForm.value).subscribe((res: any) => {
          console.log(res);
        });
      },
        error => {
          console.error();
        });
    }
  }
}