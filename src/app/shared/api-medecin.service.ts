import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiMedecinService {

  constructor(private http: HttpClient, private router: Router) { }


  getMedecins() {
    return this.http.get('http://127.0.0.1:8000/api/medecins');
  }

  getMedecinByUserId(id) {
    return this.http.get('http://127.0.0.1:8000/api/medecins/getByUserId/' + id);
  }
}
