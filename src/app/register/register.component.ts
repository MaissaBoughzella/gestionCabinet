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
  message = '';
  strength = '';
  emailValidation = '';
  roles;
  genre;
  role = "Role";
  gender="Genre";
  selectedRoleId;
  selectedGenreValue;

  constructor(private router: Router, private apiAuthService: ApiAuthService) {
    this.RegisterForm = new FormGroup({

      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      tel: new FormControl(''),
      genre: new FormControl(''),
      role: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    
  }

  ngOnInit(): void {

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
    });

    this.genre = ['Femme', 'Homme']

  }

  setGenre(gen) {
    this.gender = gen;
    this.selectedGenreValue = gen;
    console.log( this.selectedGenreValue)

  }

  setRole(rol) {
    this.role = rol.role;
    this.selectedRoleId = rol.id;
    console.log(this.role)
  }

  addUser() {
    
    console.warn(this.RegisterForm.value);
    console.log(this.RegisterForm.valid);
    if (!this.RegisterForm.valid) {
      console.log("Wrong password or Email !");
    } else {
      console.log("correct !")
      this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
        console.log(res);
      });
    }
  }


}
