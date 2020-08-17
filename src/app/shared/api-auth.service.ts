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

  getUserByRole(role) {
    return this.http.get('http://127.0.0.1:8000/api/users/byRole/' + role);
  }

  getRoles() {
    return this.http.get('http://127.0.0.1:8000/api/roles');
  }

  getSpecialite() {
    return this.http.get('http://127.0.0.1:8000/api/specialites');
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
    localStorage.removeItem('isMedecin');
    localStorage.removeItem('isPatient');
    localStorage.removeItem('isSecretaire');
    localStorage.removeItem('isSuperAdmin');
    localStorage.removeItem('id');
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }
  editUser(id,body) {
    return this.http.patch('http://127.0.0.1:8000/api/users/' + id, body);
  }

  deleteUser(id) {
    return this.http.delete('http://127.0.0.1:8000/api/users/' + id);
  }
}
