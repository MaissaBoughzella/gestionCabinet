import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAnalyseService {

  constructor(private http: HttpClient, private router: Router) { }

  // ############### les apis de table TYPE ANALYSE ##################

  getTypesAnalyses() {
    return this.http.get('http://127.0.0.1:8000/api/typeanalyses');
  }

  getTypeAnalyseById(id) {
    return this.http.get('http://127.0.0.1:8000/api/typeanalyses/' + id);
  }

// ############### les apis de table ANALYSE ################## 

  getAnalyses() {
    return this.http.get('http://127.0.0.1:8000/api/analyses');
  }

  addAnalyse(body) {
    return this.http.post('http://127.0.0.1:8000/api/analyses', body);
  }

  editAnalyse(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/analyses/' + id, body);
  }

  deleteAnalyse(id) {
    return this.http.delete('http://127.0.0.1:8000/api/analyses/' + id);
  }

}
