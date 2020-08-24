import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';

@Component({
  selector: 'app-rendez-vous-list',
  templateUrl: './rendez-vous-list.component.html',
  styleUrls: ['./rendez-vous-list.component.css']
})
export class RendezVousListComponent implements OnInit {

  addForm: FormGroup;
  selectedRdv;
  rdvs = [];
  selectedRdvId;
  selectRdvId: any;
  itemsPerPage: any;
  currentPage: any;
  totalItems: any;
  term;
  allRdvs = [];
  

  constructor(private router: Router, private apiRdvService: ApiRdvService, private apiConsService: ApiConsultationService) {
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    let patientId = localStorage.getItem('id').substring(14);
    this.apiRdvService.getAllRdvsByPatient(patientId).subscribe((res: any) => {
      this.rdvs = res['hydra:member'];
      this.allRdvs = res['hydra:member'];
    });
  }

  setSelectedRdv(rdv) {
    this.selectedRdv = rdv;
    this.selectedRdvId = rdv['@id'];
    this.selectRdvId = rdv.id;
  }

  AfficherConsultation(id) {
    this.apiConsService.getConsByRdvId(id).subscribe((res: any) => {
      this.router.navigate(['/patient/consultation', res.id]);
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }

  filterByEtat(etat) {
    var offers = [];
    if (etat.value == "Tous les états") {
      this.ngOnInit();
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
