import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPatientService {

  constructor(private http: HttpClient, private router: Router) { }


  getPatients() {
    return this.http.get('http://127.0.0.1:8000/api/patients');
  }

  getPatientById(id) {
    return this.http.get('http://127.0.0.1:8000/api/patients/' + id);
  }

  getPatientByUserId(userId) {
    return this.http.get('http://127.0.0.1:8000/api/patients/getByUserId/' + userId);
  }

  editPatient(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/patients/' + id, body);
  }
}