import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
import { ApiAnalyseService } from 'src/app/shared/api-analyse.service';
import { ApiRadioService } from 'src/app/shared/api-radio.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gestion-consultation',
  templateUrl: './gestion-consultation.component.html',
  styleUrls: ['./gestion-consultation.component.css']
})
export class GestionConsultationComponent implements OnInit {
  addAnalyseForm: FormGroup;
  addRadioForm: FormGroup;

  types: any;
  consId: any;
  analyses: any;
  selectedAnalyse: any;
  typeToEdit: any;
  type: any;
  typeName: any;
  selectedTypeId: any;
  typesradios: any;
  radios: any;
  selectedRadio: any;
  typer: any;
  typeRadioName: any;
  selectedTypeRadioId: any;
  itemsPerPage: number;
  currentPage: number;
  term;
  term2;
  anal = [];
  rad = [];
  isEmpty: boolean = false;
  isEmptyAnal: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private apiAnalyseService: ApiAnalyseService, private apiRadioService: ApiRadioService) {


    this.addAnalyseForm = new FormGroup({

      nom: new FormControl(''),
      description: new FormControl(''),
      typeanalyse: new FormControl(''),

    });

    this.addRadioForm = new FormGroup({

      nom: new FormControl(''),
      description: new FormControl(''),
      typeradio: new FormControl(''),

    });

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
      console.log(this.anal);
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

  addAnalyse() {
    const idCons = this.activatedRoute.snapshot.paramMap.get('id')
    if (!this.addAnalyseForm.valid) {
    } else {
      this.addAnalyseForm.addControl('consultation', new FormControl('/api/consultations/' + idCons));
      this.apiAnalyseService.addAnalyse(this.addAnalyseForm.value).subscribe((res: any) => {
        this.ngOnInit();
      });
    }
  }

  addImgRadio() {
    const idCons = this.activatedRoute.snapshot.paramMap.get('id')
    if (!this.addRadioForm.valid) {
    } else {
      this.addRadioForm.addControl('consultation', new FormControl('/api/consultations/' + idCons));
      this.apiRadioService.addRadio(this.addRadioForm.value).subscribe((res: any) => {
        this.ngOnInit();
      });
    }
  }

  setSelectedAnalyse(anal) {
    this.selectedAnalyse = anal;
    this.type = anal.typeanalyse.substring(18);
    this.apiAnalyseService.getTypeAnalyseById(this.type).subscribe((res: any) => {
      this.typeName = res.analyse;
    });
  }

  setSelectedRadio(radio) {
    this.selectedRadio = radio;
    this.typer = radio.typeradio.substring(16);
    this.apiRadioService.getTypeRadioById(this.typer).subscribe((res: any) => {
      this.typeRadioName = res.radio;
    });
  }

  setType(type) {
    this.typeName = type.analyse;
    this.selectedTypeId = type['@id'];
  }

  setTypeRadio(type) {
    this.typeRadioName = type.radio;
    this.selectedTypeRadioId = type['@id'];
  }

  editAnalyse(nomm, descc) {
    var body = {
      nom: nomm,
      description: descc,
      typeanalyse: this.selectedTypeId,
    }
    this.apiAnalyseService.editAnalyse(this.selectedAnalyse.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  editRadio(nom1, desc1) {
    var form = {
      nom: nom1,
      description: desc1,
      typeradio: this.selectedTypeRadioId,
    }
    this.apiRadioService.editRadio(this.selectedRadio.id, form).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteAnalyse(id) {
    this.apiAnalyseService.deleteAnalyse(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteRadio(id) {
    this.apiRadioService.deleteRadio(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }

}
