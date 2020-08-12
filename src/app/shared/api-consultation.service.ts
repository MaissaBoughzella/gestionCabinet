import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConsultationService {

  constructor(private http: HttpClient, private router: Router) { }

  getConsultations() {
    return this.http.get('http://127.0.0.1:8000/api/consultations');
  }

  getConsById(id) {
    return this.http.get('http://127.0.0.1:8000/api/consultations/' + id);
  }

  getConsByRdvId(id) {
    return this.http.get('http://127.0.0.1:8000/api/consultations/getByRdvId/' + id);
  }

  addConsultation(body) {
    return this.http.post('http://127.0.0.1:8000/api/consultations', body);
  }

  editConsultation(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/consultations/' + id, body);
  }

  deleteConsultation(id) {
    return this.http.delete('http://127.0.0.1:8000/api/consultations/' + id);
  }

}
