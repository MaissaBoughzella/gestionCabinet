import { Component, OnInit } from '@angular/core';
import { ApiMedecinService } from 'src/app/shared/api-medecin.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiPatientService } from 'src/app/shared/api-patient.service';

@Component({
  selector: 'app-profile-secretaire',
  templateUrl: './profile-secretaire.component.html',
  styleUrls: ['./profile-secretaire.component.css']
})
export class ProfileSecretaireComponent implements OnInit {

  user: any;

  constructor(private apiPatientService: ApiPatientService, private apiAuthService: ApiAuthService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('userId').substring(11);
    this.apiAuthService.getUserById(userId).subscribe((res: any) => {
      this.user = res;
    });
  }

  editProfile(nom1, prenom1, email1, pass1, adresse1, tel1) {
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

}