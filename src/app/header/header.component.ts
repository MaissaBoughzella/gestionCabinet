import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isfr: boolean = false;
  isen: boolean = false;
  isde: boolean = false;
  constructor(private translate: TranslateService, private apiService: ApiAuthService, private router: Router) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.isfr = true;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    console.log(language)
    this.isfr = true;
    if (language == 'fr') {
      this.isfr = true;
      this.isde = false;
      this.isen = false;
    }
    else if (language == 'en') {
      this.isen = true;
      this.isfr = false;
      this.isde = false;
    }
    else if (language == 'de') {
      this.isde = true;
      this.isfr = false;
      this.isen = false;
    }
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }
  isMedecin() {
    return (localStorage.getItem("isMedecin") == "true");
  }
  isPatient() {
    return (localStorage.getItem("isPatient") == "true");
  }
  isSecretaire() {
    return (localStorage.getItem("isSecretaire") == "true");
  }
  isSuperAdmin() {
    return (localStorage.getItem("isSuperAdmin") == "true");
  }
}
