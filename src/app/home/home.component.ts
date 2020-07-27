import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users;

  constructor(private apiAuthService: ApiAuthService) { }

  ngOnInit(): void {
      this.apiAuthService.getUsers().subscribe((res: any) => {
      this.users=res['hydra:member'];
    });
  }

}
