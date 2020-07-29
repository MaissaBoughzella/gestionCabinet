import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    roleName: string;
    roles;
    constructor(private fb: FormBuilder, private authService: ApiAuthService, private router: Router) {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    ngOnInit(): void {
    }

    login() {
        const val = this.loginForm.value;
        if (val.email && val.password) {
            this.authService.login(val.email, val.password).subscribe((ress) => {
                localStorage.setItem("token", ress['email']);
                localStorage.setItem('userId', ress['@id']);
                var id = ress['roles'].substring(11);
                
                this.authService.getRoleById(id).subscribe((res: any) => {
                    this.roleName=res.role;
                    if (this.roleName == "Medecin" || this.roleName == "medecin") {

                        localStorage.setItem('isMedecin', 'true');
                        this.router.navigate(['/medecin'])
                        .then(() => {
                          window.location.reload();
                        });
                    } 
                    else if (this.roleName == "Patient" || this.roleName == "patient") {

                            localStorage.setItem('isPatient', 'true');
                            this.router.navigate(['/patient'])
                            .then(() => {
                              window.location.reload();
                            });
                        }
                        else if (this.roleName == "Secretaire" || this.roleName == "secretaire") {

                            localStorage.setItem('isSecretaire', 'true');
                            this.router.navigate(['/secretaire'])
                            .then(() => {
                              window.location.reload();
                            });
                        }
                });
            });

        
    }
}
}