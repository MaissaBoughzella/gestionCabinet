import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiSecretaireService {
  existSecretaire: any;
  isEmpty: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  getSecretaireByUserId(userId) {
    return this.http.get('http://127.0.0.1:8000/api/secretaires/getByUserId/' + userId);
  }

  editSec(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/secretaires/' + id, body);
  }

  deleteSec(id) {
    return this.http.delete('http://127.0.0.1:8000/api/secretaires/' + id);
  }
}
