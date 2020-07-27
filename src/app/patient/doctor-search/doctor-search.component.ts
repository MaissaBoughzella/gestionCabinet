import { Component, OnInit } from '@angular/core';
import { ApiMedecinService } from 'src/app/shared/api-medecin.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css']
})
export class DoctorSearchComponent implements OnInit {
  medecins;
  users;
  constructor(private apiMedecinService: ApiMedecinService, private apiAuthService: ApiAuthService) { }

  ngOnInit(): void {
    this.apiMedecinService.getMedecins().subscribe((res: any) => {
      this.medecins = res['hydra:member'];
      
      // this.medecins.forEach(element => {
      //   var id=element.user.substring(11);

      //   this.apiAuthService.getUserById(id).subscribe((res: any) => {
      //     console.log(res)
      //     this.users=Array.of(res)
      //   });
      //});
      
    });

    }

}
