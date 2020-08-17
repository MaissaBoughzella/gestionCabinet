import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
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
  constructor(private router: Router, private apiRdvService: ApiRdvService, private apiConsService: ApiConsultationService) {
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {

    this.apiConsService.getConsultations().subscribe((res: any) => {
      this.consultations = res['hydra:member'];
    });
    let medId = localStorage.getItem('id').substring(14);
    this.apiRdvService.getAllRdvsByMedecin(medId).subscribe((res: any) => {
      this.rdvs = res['hydra:member'];
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
}
