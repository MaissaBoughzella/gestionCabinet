import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
import { ApiAnalyseService } from 'src/app/shared/api-analyse.service';
import { ApiRadioService } from 'src/app/shared/api-radio.service';


@Component({
  selector: 'app-consultation-by-patient',
  templateUrl: './consultation-by-patient.component.html',
  styleUrls: ['./consultation-by-patient.component.css']
})
export class ConsultationByPatientComponent implements OnInit {
  config: { itemsPerPage: number; currentPage: number; };
  types: any;
  analyses: any;
  typesradios: any;
  radios: any;
  ordId: any;
  consultation: any;
  patient: any;
  medicaments: any;
  prescriptions: any;
  itemsPerPage: number;
  currentPage: number;
  term;
  term2;
  constructor(private apiAnalyseService: ApiAnalyseService, private apiRadioService: ApiRadioService) {
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }


  ngOnInit(): void {
    this.apiAnalyseService.getTypesAnalyses().subscribe((res: any) => {
      this.types = res['hydra:member'];
    });

    this.apiAnalyseService.getAnalyses().subscribe((res: any) => {
      this.analyses = res['hydra:member'];
    });

    this.apiRadioService.getTypesRadios().subscribe((res: any) => {
      this.typesradios = res['hydra:member'];
    });

    this.apiRadioService.getRadios().subscribe((res: any) => {
      this.radios = res['hydra:member'];
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
}

