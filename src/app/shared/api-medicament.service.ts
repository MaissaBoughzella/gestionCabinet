import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMedicamentService {

  constructor(private http: HttpClient, private router: Router) { }


  getMedicaments() {
    return this.http.get('http://127.0.0.1:8000/api/medicaments');
  }

  getMedicamentById(id) {
    return this.http.get('http://127.0.0.1:8000/api/medicaments/' + id);
  }

  addMedicament(body) {
    return this.http.post('http://127.0.0.1:8000/api/medicaments', body);
  }

  editMedicament(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/medicaments/' + id, body);
  }

  deleteMedicament(id) {
    return this.http.delete('http://127.0.0.1:8000/api/medicaments/' + id);
  }
}
