import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler/src/compile_metadata';

@Injectable({
  providedIn: 'root'
})
export class ApiOrdonnanceService {

  constructor(private http: HttpClient, private router: Router) { }

  getOrdonnances() {
    return this.http.get('http://127.0.0.1:8000/api/ordonnances');
  }

  getOrdonnanceById(id) {
    return this.http.get('http://127.0.0.1:8000/api/ordonnances/' + id);
  }

  getOrdonnanceByConsultationId(id) {
    return this.http.get('http://127.0.0.1:8000/api/ordonnances/getByConsId/' + id);
  }

  addOrdonnance(body) {
    return this.http.post('http://127.0.0.1:8000/api/ordonnances', body);
  }

  editOrdonnance(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/ordonnances/' + id, body);
  }

  deleteOrdonnance(id) {
    return this.http.delete('http://127.0.0.1:8000/api/ordonnances/' + id);
  }
}
