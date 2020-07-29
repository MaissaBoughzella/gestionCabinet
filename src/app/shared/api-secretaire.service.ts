import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiSecretaireService {

  constructor(private http: HttpClient, private router: Router) { }

  getSecretaireByUserId(usetId) {
    return this.http.get('http://127.0.0.1:8000/api/secretaires/getByUserId/' + usetId);
  }
}
