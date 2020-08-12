import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiSecretaireService } from 'src/app/shared/api-secretaire.service';

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
  users: any;
  secretaires: any;
  config: { itemsPerPage: number; currentPage: number; };
  roleId1: any;
  selectedSec: any;
  genreToEdit: any;
  langueToEdit: any;
  selectedSecByUser: any;

  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiSecService: ApiSecretaireService) {
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

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };

  }

  ngOnInit(): void {

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
      for (const role of this.roles) {
        if (role.role == "Secretaire" || role.role == "secretaire") {
          this.roleId = role['@id'];
          this.roleId1 = role.id;
        }
      }
      this.apiAuthService.getUserByRole(this.roleId1).subscribe((res: any) => {
        this.secretaires = res['hydra:member'];
        //this.apiSecService.isEmpty = this.isEmpty();
      });
    });
  }

  addUser() {

    this.RegisterForm.addControl('roles', new FormControl(this.roleId, Validators.required));
    this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
      this.addSecretaireForm.addControl('user', new FormControl(res['@id'], Validators.required));
      this.addSecretaireForm.addControl('medecinId', new FormControl(localStorage.getItem('id'), Validators.required));

      this.apiAuthService.addSecretaire(this.addSecretaireForm.value).subscribe((res: any) => {
        //this.apiSecService.secretaire = res 
        this.ngOnInit();
        
      });
    },
      error => {
        console.error();
      });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  setSelectedSec(sec) {
    this.selectedSec = sec;
    this.genreToEdit = sec.genre;
    this.langueToEdit = sec.langue;
    this.apiSecService.getSecretaireByUserId(sec.id).subscribe((res: any) => {
      console.log(res)
      this.selectedSecByUser = res.id;
    });
  }

  editSec(nom1, prenom1, email1, adresse1, tel1) {
    var body = {
      nom: nom1,
      prenom: prenom1,
      email: email1,
      adresse: adresse1,
      telephone: tel1,
      genre: this.genreToEdit,
      langue: this.langueToEdit,
    };
    var body1 = {};

    this.apiAuthService.editUser(this.selectedSec.id, body).subscribe((res: any) => {
      this.apiSecService.editSec(this.selectedSecByUser, body1).subscribe((res: any) => {
        this.ngOnInit();
      });
    });
  }

  setGenre(genre: HTMLElement) {
    var genr = genre.innerHTML;
    if (genr == "Femme")
      this.genreToEdit = "Femme";
    if (genr == "Homme")
      this.genreToEdit = "Homme";
  }

  getGenre(genre) {
    if (genre == "Femme")
      return "Femme";
    if (genre == "Homme")
      return "Homme";
  }

  setLangue(lan: HTMLElement) {
    var lang = lan.innerHTML;
    if (lang == "Français")
      this.genreToEdit = "Français";
    if (lang == "Anglais")
      this.genreToEdit = "Anglais";
    if (lang == "Allemand")
      this.genreToEdit = "Allemand";
  }

  getLangue(lan) {
    if (lan == "Français")
      return "Français";
    if (lan == "Anglais")
      return "Anglais";
    if (lan == "Allemand")
      return "Allemand";
  }

  deleteSec(id) {
    this.apiAuthService.deleteUser(id).subscribe((res: any) => {
      //this.apiSecService.secretaire = res
      this.ngOnInit();
    });
  }

  // public isEmpty(): boolean {
  //   if (this.apiSecService.secretaire == undefined
  //     || this.apiSecService.secretaire == null) {
  //     return true;
  //   }
  //   else return false;
  // }


}