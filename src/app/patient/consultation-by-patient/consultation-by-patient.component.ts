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
  radios = [];
  ordId: any;
  consultation: any;
  patient: any;
  medicaments: any;
  prescriptions: any;
  itemsPerPage: number;
  currentPage: number;
  term;
  term2;
  anal = [];
  rad = [];
  isEmpty: boolean = false;
  isEmptyAnal: boolean = false;

  constructor(private apiAnalyseService: ApiAnalyseService, private apiRadioService: ApiRadioService,
    private activatedRoute: ActivatedRoute,) {
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }


  ngOnInit(): void {
    let tab = [];
    let tab1 = [];
    this.anal = [];
    this.rad = [];
    const idCons = this.activatedRoute.snapshot.paramMap.get('id')
    this.apiAnalyseService.getTypesAnalyses().subscribe((res: any) => {
      this.types = res['hydra:member'];
    });

    this.apiAnalyseService.getAnalysesByConsultation(idCons).subscribe((res: any) => {
      this.analyses = res['hydra:member'];
      if (this.analyses.length == 0) {
        this.isEmptyAnal = true;
      }
      else this.isEmptyAnal = false;
      for (let j = 0; j < this.analyses.length; j++) {
        tab.push(this.analyses[j].typeanalyse.substring(18));
      }
      for (let i = 0; i < tab.length; i++) {
        this.apiAnalyseService.getTypeAnalyseById(tab[i]).subscribe((res: any) => {
          this.anal.push(res.analyse);
        });
      }
    });

    this.apiRadioService.getTypesRadios().subscribe((res: any) => {
      this.typesradios = res['hydra:member'];
    });

    this.apiRadioService.getRadiosByConsultation(idCons).subscribe((res: any) => {
      this.radios = res['hydra:member'];
      if (this.radios.length == 0) {
        this.isEmpty = true;
      }
      else this.isEmpty = false;
      for (let j = 0; j < this.radios.length; j++) {
        tab1.push(this.radios[j].typeradio.substring(16));
      }
      for (let i = 0; i < tab1.length; i++) {
        this.apiRadioService.getTypeRadioById(tab1[i]).subscribe((res: any) => {
          this.rad.push(res.radio);
        });
      }
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
}

