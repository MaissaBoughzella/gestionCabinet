import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  addForm: FormGroup;
  selectedRdv;
  consultations = [];
  rdvs = [];
  selectedRdvId;
  selectRdvId: any;
  itemsPerPage: number;
  currentPage: number;
  term;
  tab = [];
  user = [];
  patientNom = [];
  allRdvs = [];
  constructor(private router: Router, private apiRdvService: ApiRdvService,
    private apiConsService: ApiConsultationService, private apiAuthService: ApiAuthService,
    private apiPatientService: ApiPatientService) {
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.patientNom = [];
    this.tab = [];
    this.user = [];
    this.apiConsService.getConsultations().subscribe((res: any) => {
      this.consultations = res['hydra:member'];
    });

    let medId = localStorage.getItem('id').substring(14);
    this.apiRdvService.getAllRdvsByMedecin(medId).subscribe((res: any) => {
      this.rdvs = res['hydra:member'];
      this.allRdvs = res['hydra:member'];
      for (let j = 0; j < this.rdvs.length; j++) {
        this.tab.push(this.rdvs[j].patient.substring(14));
      }
      for (let i = 0; i < this.tab.length; i++) {
        this.apiPatientService.getPatientById(this.tab[i]).subscribe((res: any) => {
          this.user.push(res.user.substring(11));
          this.apiAuthService.getUserById(this.user[i]).subscribe((res: any) => {
            this.patientNom.push(res.prenom + ' ' + res.nom);
          });
        });
      }
    });
  }

  setSelectedRdv(rdv) {
    this.selectedRdv = rdv;
    this.selectedRdvId = rdv['@id'];
    this.selectRdvId = rdv.id;
  }

  addcons(dat, heur, pri) {
    var body = {
      date: dat,
      heure: heur,
      prix: Number(pri),
      rdv: this.selectedRdvId
    };
    var body1 = {
      etat: "Consulté",
    }
    this.apiConsService.addConsultation(body).subscribe((res: any) => {
      this.apiRdvService.editRdv(this.selectRdvId, body1).subscribe((ress: any) => {
        this.router.navigate(['/medecin/consultation', res.id]);
      });
    });
  }

  annulercons() {
    var body = {
      etat: "Annulé",
    }
    this.apiRdvService.editRdv(this.selectRdvId, body).subscribe((ress: any) => {
    });
  }

  AfficherConsultation(id) {
    this.apiConsService.getConsByRdvId(id).subscribe((res: any) => {
      this.router.navigate(['/medecin/consultation', res.id]);
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }

  filterByEtat(etat) {
    var offers = [];
    if (etat.value == "Tous les états") {
      this.rdvs = this.allRdvs;
    }

    if (etat.value == "Consulté") {
      this.rdvs = this.allRdvs;
      for (let i = 0; i < this.rdvs.length; i++) {
        if (this.rdvs[i].etat == "Consulté") {
          offers.push(this.rdvs[i]);
        }
      }
      this.rdvs = offers;
    }
    else if (etat.value == "Non consulté") {
      this.rdvs = this.allRdvs;
      for (let i = 0; i < this.rdvs.length; i++) {
        if (this.rdvs[i].etat == "Non consulté") {
          offers.push(this.rdvs[i]);

        }
      }
      this.rdvs = offers;
    }
    else if (etat.value == "Annulé") {
      this.rdvs = this.allRdvs;
      for (let i = 0; i < this.rdvs.length; i++) {
        if (this.rdvs[i].etat == "Annulé") {
          offers.push(this.rdvs[i]);

        }
      }
      this.rdvs = offers;
    }
  }
}
