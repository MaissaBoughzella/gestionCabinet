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

  constructor(private translate: TranslateService, private apiService: ApiAuthService, private router: Router) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
  }

  useLanguage(language: string) {
    this.translate.use(language);
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
