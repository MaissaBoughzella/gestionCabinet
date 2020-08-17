import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSpecialiteService {


  constructor(private http: HttpClient, private router: Router) { }

  getSpecialites() {
    return this.http.get('http://127.0.0.1:8000/api/specialites');
  } 

  addSpecialite(body) {
    return this.http.post('http://127.0.0.1:8000/api/specialites', body);
  }

  editSpecialite(id,body) {
    return this.http.patch('http://127.0.0.1:8000/api/specialites/' + id, body);
  }

  deleteSpecialite(id) {
    return this.http.delete('http://127.0.0.1:8000/api/specialites/' + id);
  }
}
