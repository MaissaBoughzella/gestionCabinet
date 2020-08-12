import { Component, OnInit } from '@angular/core';
import { ApiMedecinService } from 'src/app/shared/api-medecin.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  medecin: any;
  medecinSpec: any;
  profile: FormGroup;
  specialites: any;
  selectedSpecId: any;

  constructor(private apiMedeciService: ApiMedecinService, private apiAuthService: ApiAuthService) {
    this.profile = new FormGroup({
      medicament: new FormControl(''),
    });
  }

  ngOnInit(): void {
    let userId = localStorage.getItem('userId').substring(11);
    let medId = localStorage.getItem('id').substring(14);
    this.apiAuthService.getUserById(userId).subscribe((res: any) => {
      this.user = res;
    });

    this.apiMedeciService.getMedecinById(medId).subscribe((res: any) => {
      this.medecin = res;
      let spec = res.specialite.substring(17);
      this.apiMedeciService.getSpecialite(spec).subscribe((res: any) => {
        this.medecinSpec = res.specialite;
      });
    });

    this.apiAuthService.getSpecialite().subscribe((res: any) => {
      this.specialites = res['hydra:member'];
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
    let medId = localStorage.getItem('id').substring(14);
    this.apiMedeciService.editMedecin(medId, body).subscribe((res: any) => {
      this.ngOnInit();
      //window.location.reload();
    });
  }

}
