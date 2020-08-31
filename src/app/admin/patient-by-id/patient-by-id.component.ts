import { Component, OnInit } from '@angular/core';
import { ApiMedecinService } from 'src/app/shared/api-medecin.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-patient-by-id',
  templateUrl: './patient-by-id.component.html',
  styleUrls: ['./patient-by-id.component.css']
})
export class PatientByIdComponent implements OnInit {

  user: any;
  patient: any;
  patientId: any;

  constructor(private router: Router, private apiPatientService: ApiPatientService, private apiAuthService: ApiAuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    var userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiAuthService.getUserById(userId).subscribe((res: any) => {
      this.user = res;
      this.apiPatientService.getPatientByUserId(userId).subscribe((res: any) => {
        this.patient = res;

      });
    });

  }

  editProfile(nom1, prenom1, daten1, prof1, email1, pass1, adresse1, tel1) {
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
    var body1 = {
      dateNaiss: daten1,
      profession: prof1,
    };
    var userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiPatientService.getPatientByUserId(userId).subscribe((res: any) => {
      this.patientId = res.id;
      this.apiAuthService.editUser(this.user.id, body).subscribe((res: any) => {
        localStorage.setItem('token', res.email);
        this.apiPatientService.editPatient(this.patientId, body1).subscribe((res: any) => {
         // this.ngOnInit();
         this.router.navigate(['/superAdmin/patients']);

        });
      });
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
