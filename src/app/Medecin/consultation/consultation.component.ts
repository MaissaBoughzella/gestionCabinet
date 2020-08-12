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
  config: { itemsPerPage: number; currentPage: number };
  selectedRdvId;
  selectRdvId: any;

  constructor(private router: Router, private apiRdvService: ApiRdvService, private apiConsService: ApiConsultationService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  ngOnInit(): void {

    this.apiConsService.getConsultations().subscribe((res: any) => {
      this.consultations = res['hydra:member'];
    });

    this.apiRdvService.getRdvs().subscribe((res: any) => {
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
    this.config.currentPage = event;
  }
}
