import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSpecialiteService } from 'src/app/shared/api-specialite.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {

  itemsPerPage: number;
  currentPage: number;
  specialites;
  term;
  addForm: FormGroup;
  isSelectedSpec: any;

  constructor(private router: Router, private apiSpecialite: ApiSpecialiteService) {
    this.addForm = new FormGroup({
      specialite: new FormControl('', [Validators.required]),
    });

    this.itemsPerPage = 6;
    this.currentPage = 1;

  }

  ngOnInit(): void {
    this.apiSpecialite.getSpecialites().subscribe((res: any) => {
      this.specialites = res['hydra:member'];
    });
  }

  addSpecialite() {
    this.apiSpecialite.addSpecialite(this.addForm.value).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setSelectedSpec(spec) {
    this.isSelectedSpec = spec;
  }

  editSpecialite(nom1) {
    var body = {
      specialite: nom1,
    };
    this.apiSpecialite.editSpecialite(this.isSelectedSpec.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteSpecialite() {
    this.apiSpecialite.deleteSpecialite(this.isSelectedSpec.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
}