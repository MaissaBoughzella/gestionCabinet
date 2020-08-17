import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRadioService } from 'src/app/shared/api-radio.service';
@Component({
  selector: 'app-type-radio',
  templateUrl: './type-radio.component.html',
  styleUrls: ['./type-radio.component.css']
})
export class TypeRadioComponent implements OnInit {
  itemsPerPage: number;
  currentPage: number;
  term;
  addForm: FormGroup;
  types: any;
  isSelectedType: any;

  constructor(private router: Router, private apiType: ApiRadioService) {
    this.addForm = new FormGroup({
      radio: new FormControl('', [Validators.required]),
    });

    this.itemsPerPage = 6;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.apiType.getTypesRadios().subscribe((res: any) => {
      this.types = res['hydra:member'];
    });
  }

  addTypeImageRadio() {
    this.apiType.addTypeRadio(this.addForm.value).subscribe((res: any) => {
     this.ngOnInit();
    });
  }

  setSelectedType(type) {
    this.isSelectedType = type;
  }

  editTypeImageRadio(nom1) {
    var body = {
      radio: nom1,
    };
    this.apiType.editTypeRadio(this.isSelectedType.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteTypeImageRadio() {
    this.apiType.deleteTypeRadio(this.isSelectedType.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
}


