import { Component } from '@angular/core';
import {
    HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Teacher } from '../data-model/teacher';
import { InputAddOnService } from '../../services/input-add-on.service';
import { environment } from '../../environments/environment';
import { PasswordValidation } from '../../services/validators/password-validation';


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
     * Status sent by registration service once the request is submitted
     *
     * @type boolean
     */
    registrationStatus: Observable<boolean>;

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
     *
     * @return void
     */
    constructor(
        private fb: FormBuilder,
        public addOnService: InputAddOnService,
        private http: HttpClient,
        public router: Router
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
                this.router.navigate(['/login']);                },
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
