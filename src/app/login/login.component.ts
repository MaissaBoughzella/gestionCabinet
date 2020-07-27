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
            this.authService.login(val.email, val.password).subscribe((res) => {
                localStorage.setItem("token",res['email']);
                this.router.navigate(['/home'])
                .then(() => {
                  window.location.reload();
                }); 
            },
                error => {
                    console.error();
                }
            );
        }
    }

}
