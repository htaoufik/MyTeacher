import { Component } from '@angular/core';
import {
    HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { InputAddOnService } from '../../services/input-add-on.service';
import { environment } from '../../environments/environment';
import { PasswordValidation } from '../../services/validators/password-validation';
import { AuthService } from '../../services/security/auth.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss', '../app.component.scss',  '../../sass/form.scss']
})

export class RegistrationFormComponent {

    /**
     * The message displayed to the visitor attempting to register
     *
     * @type {string}
     */
    message: string;

    /**
     * The registration form
     *
     * @type FormGroup
     */
    registrationForm: FormGroup;

    /**
     * Form submission status
     *
     * @type boolean
     */
    submitted: boolean = false;

    /**
     * Constructor injects the FormBuilder
     *
     * @param {FormBuilder} fb
     * @param {InputAddOnService} addOnService
     * @param {HttpClient} http
     * @param {Router} router
     * @param {AuthService} authService
     *
     * @return void
     */
    constructor(
        private fb: FormBuilder,
        public addOnService: InputAddOnService,
        private http: HttpClient,
        public router: Router,
        public authService: AuthService
        ) {
        this.createForm();
    }

    /**
     * Creates the registration form with the validators
     *
     * @return void
     */
    createForm(): void {
        this.registrationForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)] ],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email] ],
            password: ['', [Validators.required, Validators.minLength(8)] ],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)] ]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    /**
     * Sends the Http request to register the current user
     * and logs him in automatically if the registration is successful
     *
     * @return void
     */
    register(): void {
        this.submitted = true;
        this.http.post(
            environment.apiEndPoints.registrationService,
            {
                'firstName': this.registrationForm.value.firstName,
                'lastName': this.registrationForm.value.lastName,
                'email': this.registrationForm.value.email,
                'password': this.registrationForm.value.password,
            }
        ).subscribe(
            data => {
                this.authService.login(this.registrationForm.value.email, this.registrationForm.value.password).subscribe(() => {
                    const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/teacher/home';
                    this.router.navigate([redirect]);
                });
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    this.message = error.error.message;
                } else {
                    this.message = `Backend returned code ${error.status}, body was: ${error.error}`;
                }
            }
        );
    }
}
