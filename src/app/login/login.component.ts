import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { ApiMedecinService } from '../shared/api-medecin.service';
import { ApiPatientService } from '../shared/api-patient.service';
import { ApiSecretaireService } from '../shared/api-secretaire.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    roleName: string;
    roles;
    errorMessage = '';
    constructor(private fb: FormBuilder, private authService: ApiAuthService,
        private apiMedService: ApiMedecinService, private apiPatientService: ApiPatientService,
        private apiSecService: ApiSecretaireService, private router: Router) {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    ngOnInit(): void {
    }

    login() {
        this.errorMessage='';
        const val = this.loginForm.value;
        if (val.email && val.password) {
            this.errorMessage = '';
            this.authService.login(val.email, val.password).subscribe((ress) => {
                localStorage.setItem("token", ress['email']);
                localStorage.setItem('userId', ress['@id']);
                var id = ress['roles'].substring(11);
                var user = ress['@id'].substring(11);
                this.authService.getRoleById(id).subscribe((res: any) => {
                    this.roleName = res.role;
                    if (this.roleName == "Medecin" || this.roleName == "medecin") {

                        this.apiMedService.getMedecinByUserId(user).subscribe((res: any) => {
                            localStorage.setItem('id', res['@id']);

                            localStorage.setItem('isMedecin', 'true');
                            this.router.navigate(['/medecin'])
                                .then(() => {
                                    window.location.reload();
                                });
                        });
                    }
                    else if (this.roleName == "Patient" || this.roleName == "patient") {
                        this.apiPatientService.getPatientByUserId(user).subscribe((res: any) => {
                            localStorage.setItem('id', res['@id']);

                            localStorage.setItem('isPatient', 'true');
                            this.router.navigate(['/patient'])
                                .then(() => {
                                    window.location.reload();
                                });
                        });
                    }
                    else if (this.roleName == "Secretaire" || this.roleName == "secretaire") {
                        this.apiSecService.getSecretaireByUserId(user).subscribe((res: any) => {
                            localStorage.setItem('id', res['@id']);

                            localStorage.setItem('isSecretaire', 'true');
                            this.router.navigate(['/secretaire'])
                                .then(() => {
                                    window.location.reload();
                                });
                        });
                    }
                    else if (this.roleName == "Super Admin" || this.roleName == "Super admin"
                        || this.roleName == "super Admin" || this.roleName == "super admin") {
                        localStorage.setItem('isSuperAdmin', 'true');
                        this.router.navigate(['/superAdmin'])
                            .then(() => {
                                window.location.reload();
                            });
                    }
                });
            },
                (error) => {
                    this.errorMessage = error.error['hydra:description'];
                }
            );


        }
    }
}