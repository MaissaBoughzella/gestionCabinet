import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {


  constructor(private http: HttpClient, private router: Router) { }

  getUsers(){
    return this.http.get('http://127.0.0.1:8000/api/users');
  }
  getRoles(){
    return this.http.get('http://127.0.0.1:8000/api/roles');
  }
  addUser(body) {
    return this.http.post('http://127.0.0.1:8000/api/users', body);
  }
}
