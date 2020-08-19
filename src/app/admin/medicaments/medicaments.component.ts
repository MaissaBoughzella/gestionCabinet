import { Component, OnInit } from '@angular/core';
import { ApiMedicamentService } from 'src/app/shared/api-medicament.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  itemsPerPage: number;
  currentPage: number;
  term;
  medicaments = [];
  addForm: any;
  isSelectedMed: any;

  constructor(private apiMedicamentsService: ApiMedicamentService) {
    this.addForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.apiMedicamentsService.getMedicaments().subscribe((res: any) => {
      this.medicaments = res['hydra:member'];
    });
  }

  add() {
    this.apiMedicamentsService.addMedicament(this.addForm.value).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setSelectedMed(med) {
    this.isSelectedMed = med;
  }

  edit(nom1, desc1) {
    var body = {
      nom: nom1,
      description: desc1,
    };
    this.apiMedicamentsService.editMedicament(this.isSelectedMed.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  delete() {
    this.apiMedicamentsService.deleteMedicament(this.isSelectedMed.id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  pageChanged(event) {
    this.currentPage = event;
  }
}
