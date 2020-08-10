import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRadioService {

  constructor(private http: HttpClient, private router: Router) { }

  // ############### les apis de table TypeRadio ##################

  getTypesRadios() {
    return this.http.get('http://127.0.0.1:8000/api/typeradios');
  }

  getTypeRadioById(id) {
    return this.http.get('http://127.0.0.1:8000/api/typeradios/' + id);
  }

// ############### les apis de table ImageRadio ################## 

  getRadios() {
    return this.http.get('http://127.0.0.1:8000/api/imageradios');
  }

  getRadioById(id) {
    return this.http.get('http://127.0.0.1:8000/api/imageradios/' + id);
  }

  addRadio(body) {
    return this.http.post('http://127.0.0.1:8000/api/imageradios', body);
  }

  editRadio(id, body) {
    return this.http.patch('http://127.0.0.1:8000/api/imageradios/' + id, body);
  }

  deleteRadio(id) {
    return this.http.delete('http://127.0.0.1:8000/api/imageradios/' + id);
  }

}
