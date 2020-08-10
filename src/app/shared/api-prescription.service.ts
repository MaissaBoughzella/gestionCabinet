import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPrescriptionService {

  constructor(private http: HttpClient, private router: Router) { }


  // getPrescriptions() {
  //   return this.http.get('http://127.0.0.1:8000/api/medicaments');
  // }

  getPrescriptionByOrdId(id) {
    return this.http.get('http://127.0.0.1:8000/api/prescriptions/getByOrdId/' + id);
  }

  addPrescription(body) {
    return this.http.post('http://127.0.0.1:8000/api/prescriptions', body);
  }

  editPrescription(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/prescriptions/' + id, body);
  }

  deletePrescription(id) {
    return this.http.delete('http://127.0.0.1:8000/api/prescriptions/' + id);
  }
}
