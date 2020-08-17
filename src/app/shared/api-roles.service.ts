import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRolesService {


  constructor(private http: HttpClient, private router: Router) { }

  addRole(body) {
    return this.http.post('http://127.0.0.1:8000/api/roles', body);
  }

  editRole(id,body) {
    return this.http.patch('http://127.0.0.1:8000/api/roles/' + id, body);
  }

  deleteRole(id) {
    return this.http.delete('http://127.0.0.1:8000/api/roles/' + id);
  }
}
