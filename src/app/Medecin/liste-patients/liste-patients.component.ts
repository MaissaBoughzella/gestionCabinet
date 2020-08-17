import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css']
})
export class ListePatientsComponent implements OnInit {

  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiRdvService: ApiRdvService) {
  }

  ngOnInit(): void {
    let medId = localStorage.getItem('id').substring(14);
    this.apiRdvService.getAllRdvsByMedecin(medId).subscribe((res: any) => {
       
      console.log(res['hydra:member'])
    });

  }

}
