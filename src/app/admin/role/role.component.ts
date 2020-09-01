import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiRolesService } from 'src/app/shared/api-roles.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  itemsPerPage: number;
  currentPage: number;
  roles;
  term;
  addForm: FormGroup;
  isSelectedRole: any;

  constructor(private router: Router, private apiAuthService: ApiAuthService, private apiRolesService: ApiRolesService) {
    this.addForm = new FormGroup({
      role: new FormControl('', [Validators.required]),
    });

    this.itemsPerPage = 6;
    this.currentPage = 1;

  }
  ngOnInit(): void {
    this.apiAuthService.getRoles().subscribe((res: any) => {
      this.roles = res['hydra:member'];
    });
  }

  addRole() {
    this.apiRolesService.addRole(this.addForm.value).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setSelectedRole(role) {
    this.isSelectedRole = role;
  }

  editRole(nom1) {
    var body = {
      role: nom1,
    };
    this.apiRolesService.editRole(this.isSelectedRole.id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  // deleteRole() {
  //   this.apiRolesService.deleteRole(this.isSelectedRole.id).subscribe((res: any) => {
  //     this.ngOnInit();
  //   });
  // }

  pageChanged(event) {
    this.currentPage = event;
  }
}
