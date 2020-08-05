import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
import { ApiAnalyseService } from 'src/app/shared/api-analyse.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gestion-consultation',
  templateUrl: './gestion-consultation.component.html',
  styleUrls: ['./gestion-consultation.component.css']
})
export class GestionConsultationComponent implements OnInit {
  addAnalyseForm: FormGroup;
  config: { itemsPerPage: number; currentPage: number; };
  types: any;
  consId: any;
  analyses: any;
  selectedAnalyse: any;
  typeToEdit: any;
  type: any;
  typeName: any;
  selectedTypeId: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiConsService: ApiConsultationService, private apiAnalyseService: ApiAnalyseService) {

    this.addAnalyseForm = new FormGroup({

      nom: new FormControl(''),
      description: new FormControl(''),
      typeanalyse: new FormControl(''),

    });

    this.config = {
      itemsPerPage: 2,
      currentPage: 1,
    };
  }


  ngOnInit(): void {

    this.apiAnalyseService.getTypesAnalyses().subscribe((res: any) => {
      this.types = res['hydra:member'];
    });

    this.apiAnalyseService.getAnalyses().subscribe((res: any) => {
      this.analyses = res['hydra:member'];

    });
  }

  // getAnalyseName(typeId){
  //   var analtypeId = typeId.substring(11);
  //   this.apiAnalyseService.getTypeAnalyseById(analtypeId).subscribe((res: any) => {
  //     return res.analyse;
  //     console.log(res)
  //   });
  // }

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

  setSelectedAnalyse(anal) {
    this.selectedAnalyse = anal; 
    this.type = anal.typeanalyse.substring(18);
    this.apiAnalyseService.getTypeAnalyseById(this.type).subscribe((res: any) => {
      this.typeName = res.analyse;
    });
  }

  
  setType(type){
    this.typeName = type.analyse;
    this.selectedTypeId = type['@id'];
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

  deleteAnalyse(id) {
    this.apiAnalyseService.deleteAnalyse(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }


}
