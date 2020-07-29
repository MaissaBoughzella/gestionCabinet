import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRdvService {

  constructor(private http: HttpClient, private router: Router) { }
  
  getRdvs() {
    return this.http.get('http://127.0.0.1:8000/api/rdvs');
  }

  addRdv(body) {
    return this.http.post('http://127.0.0.1:8000/api/rdvs', body);
  }

  editRdv(id,body) {
    return this.http.patch('http://127.0.0.1:8000/api/rdvs/' + id, body);
  }

  deleteRdv(id) {
    return this.http.delete('http://127.0.0.1:8000/api/rdvs/' + id);
  }

}
