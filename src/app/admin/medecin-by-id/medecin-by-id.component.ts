import { Component, OnInit } from '@angular/core';
import { ApiMedecinService } from 'src/app/shared/api-medecin.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiSecretaireService } from 'src/app/shared/api-secretaire.service';

@Component({
  selector: 'app-medecin-by-id',
  templateUrl: './medecin-by-id.component.html',
  styleUrls: ['./medecin-by-id.component.css']
})
export class MedecinByIdComponent implements OnInit {

  user: any;
  medecin: any;
  genre = ['Femme', 'Homme'];
  langue = ['Français', 'Anglais', 'Allemand'];
  medecinSpec: any;
  profile: FormGroup;
  specialites: any;
  selectedSpecId: any;
  medId: any;
  rolesec: any;
  roleId1sec: any;
  secretaires: any;
  itemsPerPage: number;
  currentPage: number;
  term;
  secMedecin = [];
  selectedSec: any;
  genreToEdit: any;
  langueToEdit: any;
  selectedSecByUser: any;
  RegisterForm: FormGroup;
  addSecretaireForm: FormGroup;
  roleId: any;
  roles: any;
  constructor(private apiMedeciService: ApiMedecinService, private activatedRoute: ActivatedRoute,
    private apiAuthService: ApiAuthService, private apiMedService: ApiMedecinService, private apiSecretaireService: ApiSecretaireService) {
    this.profile = new FormGroup({
      medicament: new FormControl(''),
    });
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
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.secMedecin = [];
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiAuthService.getUserById(userId).subscribe((res: any) => {
      this.user = res;
    });
    this.apiMedService.getMedecinByUserId(userId).subscribe((res: any) => {
      this.medecin = res;
      this.medId = res.id;
      let spec = res.specialite.substring(17);
      this.apiMedeciService.getSpecialite(spec).subscribe((res: any) => {
        this.medecinSpec = res.specialite;
      });
    });

    this.apiAuthService.getSpecialite().subscribe((res: any) => {
      this.specialites = res['hydra:member'];
    });

    this.apiMedService.getMedecinByUserId(userId).subscribe((res: any) => {
      this.medId = res['@id'];
      this.apiSecretaireService.getSecretaires().subscribe((res: any) => {
        this.secretaires = res['hydra:member'];
        for (let j = 0; j < this.secretaires.length; j++) {
          if (this.secretaires[j].medecinId == this.medId) {
            let userId = this.secretaires[j].user.substring(11);
            this.apiAuthService.getUserById(userId).subscribe((res: any) => {
              this.secMedecin.push(res);
            });
          }
        }
      });
    });

    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];

      for (const role of this.roles) {

        if (role.role == "Secretaire" || role.role == "secretaire") {
          this.roleId = role["@id"];
        }
      }
    });
  }

  editInfoGen(nom1, prenom1, email1, pass1, adresse1, tel1) {
    var body = {
      nom: nom1,
      prenom: prenom1,
      email: email1,
      password: pass1,
      adresse: adresse1,
      telephone: tel1,
      genre: this.user.genre,
      langue: this.user.langue,
    };
    this.apiAuthService.editUser(this.user.id, body).subscribe((res: any) => {
      localStorage.setItem('token', res.email);
      this.ngOnInit();
    });
  }

  setGenre(genre: HTMLElement) {
    var genr = genre.innerHTML;
    if (genr == "Femme")
      this.user.genre = "Femme";
    if (genr == "Homme")
      this.user.genre = "Homme";
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
      this.user.langue = "Français";
    if (lang == "Anglais")
      this.user.langue = "Anglais";
    if (lang == "Allemand")
      this.user.langue = "Allemand";
  }

  getLangue(lan) {
    if (lan == "Français")
      return "Français";
    if (lan == "Anglais")
      return "Anglais";
    if (lan == "Allemand")
      return "Allemand";
  }

  setGenre1(genre: HTMLElement) {
    var genr = genre.innerHTML;
    if (genr == "Femme")
      this.genreToEdit = "Femme";
    if (genr == "Homme")
      this.genreToEdit = "Homme";
  }

  getGenre1(genre) {
    if (genre == "Femme")
      return "Femme";
    if (genre == "Homme")
      return "Homme";
  }

  setLangue1(lan: HTMLElement) {
    var lang = lan.innerHTML;
    if (lang == "Français")
      this.langueToEdit = "Français";
    if (lang == "Anglais")
      this.langueToEdit = "Anglais";
    if (lang == "Allemand")
      this.langueToEdit = "Allemand";
  }

  getLangue1(lan) {
    if (lan == "Français")
      return "Français";
    if (lan == "Anglais")
      return "Anglais";
    if (lan == "Allemand")
      return "Allemand";
  }

  resetBtn() {
    window.location.reload();
  }

  setSpecialite(spec) {
    this.medecinSpec = spec.specialite;
    this.selectedSpecId = spec['@id'];
  }

  editInfoProf(form1, qualif1, exp1) {
    var body = {
      qualification: qualif1,
      experience: exp1,
      formation: form1,
      specialite: this.selectedSpecId
    };
    this.apiMedeciService.editMedecin(this.medId, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
  addUser() {
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiMedService.getMedecinByUserId(userId).subscribe((res: any) => {
      this.medId = res['@id'];
      this.RegisterForm.addControl('roles', new FormControl(this.roleId, Validators.required));
      this.apiAuthService.addUser(this.RegisterForm.value).subscribe((res: any) => {
        this.addSecretaireForm.addControl('user', new FormControl(res['@id'], Validators.required));
        this.addSecretaireForm.addControl('medecinId', new FormControl(this.medId, Validators.required));
        this.apiAuthService.addSecretaire(this.addSecretaireForm.value).subscribe((res: any) => {
          this.ngOnInit();
        });
      },
        error => {
          console.error();
        });
    });
  }

  setSelectedSec(sec) {
    this.selectedSec = sec;
    console.log(this.selectedSec.id)
    this.genreToEdit = sec.genre;
    this.langueToEdit = sec.langue;
    this.apiSecretaireService.getSecretaireByUserId(sec.id).subscribe((res: any) => {
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
      this.apiSecretaireService.editSec(this.selectedSecByUser, body1).subscribe((res: any) => {
        this.ngOnInit();
      });
    });
  }
  deleteSec() {
    this.apiAuthService.deleteUser(this.selectedSec.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

}
