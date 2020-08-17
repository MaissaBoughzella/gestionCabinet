import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiAnalyseService } from 'src/app/shared/api-analyse.service';

@Component({
  selector: 'app-type-analyse',
  templateUrl: './type-analyse.component.html',
  styleUrls: ['./type-analyse.component.css']
})
export class TypeAnalyseComponent implements OnInit {

  itemsPerPage: number;
  currentPage: number;
  term;
  addForm: FormGroup;
  types: any;
  isSelectedType: any;

  constructor(private router: Router, private apiType: ApiAnalyseService) {
    this.addForm = new FormGroup({
      analyse: new FormControl('', [Validators.required]),
    });

    this.itemsPerPage = 6;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.apiType.getTypesAnalyses().subscribe((res: any) => {
      this.types = res['hydra:member'];
    });
  }

  addTypeAnalyse() {
    this.apiType.addTypeAnalyse(this.addForm.value).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setSelectedType(type) {
    this.isSelectedType = type;
  }

  editTypeAnalyse(nom1) {
    var body = {
      analyse: nom1,
    };
    this.apiType.editTypeAnalyse(this.isSelectedType.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteTypeAnalyse() {
    this.apiType.deleteTypeAnalyse(this.isSelectedType.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
}

