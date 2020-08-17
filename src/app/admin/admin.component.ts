import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users=[];

  constructor(private apiService: ApiAuthService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((res: any) => {
      this.users = res['hydra:member'];
    });

  }

}
