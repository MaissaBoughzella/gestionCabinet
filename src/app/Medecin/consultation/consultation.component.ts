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

  constructor(private router: Router, private apiRdvService: ApiRdvService, private apiConsService: ApiConsultationService) {
    this.config = {
      itemsPerPage: 2,
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
    this.selectedRdvId = rdv['@id']
  }

  addcons(dat, heur, pri) {
    var body = {
      date: dat,
      heure: heur,
      prix: Number(pri),
      rdv: this.selectedRdvId
    }
    this.apiConsService.addConsultation(body).subscribe((res: any) => {
      
      this.router.navigate(['/medecin/consultation', res.id]);
    });

  }

  // deleteRdv(id) {
  //   this.apiRdvService.deleteRdv(id).subscribe((res: any) => {
  //     this.ngOnInit();
  //   });
  // }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
