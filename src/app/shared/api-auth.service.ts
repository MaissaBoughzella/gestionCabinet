import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {


  constructor(private http: HttpClient, private router: Router) { }


  getUsers() {
    return this.http.get('http://127.0.0.1:8000/api/users');
  }
  
  getUserById(id) {
    return this.http.get('http://127.0.0.1:8000/api/users/' + id);
  }
  getRoles() {
    return this.http.get('http://127.0.0.1:8000/api/roles');
  }

  getRoleById(id) {
    return this.http.get('http://127.0.0.1:8000/api/roles/' + id);

  }
  addUser(body) {
    return this.http.post('http://127.0.0.1:8000/api/users', body);
  }

  addMedecin(body) {
    return this.http.post('http://127.0.0.1:8000/api/medecins', body);
  }

  addPatient(body) {
    return this.http.post('http://127.0.0.1:8000/api/patients', body);
  }

  addSecretaire(body) {
    return this.http.post('http://127.0.0.1:8000/api/secretaires', body);
  }

  login(email, password) {
    return this.http.get('http://127.0.0.1:8000/api/users/verify/' + email + '/' + password);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }
}
