import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../app.component.scss']
})
export class LoginComponent {

    /**
     * The message displayed to the visitor attempting to log in
     *
     * @type {string}
     */
    message: string;

    /**
     * The registration form
     *
     * @type FormGroup
     */
    loginForm: FormGroup;

    /**
     * Constructor injects the Auth Service and the router
     *
     * @param {AuthService} authService
     * @param {Router} router
     * @param {FormBuilder} fb
     * @return void
     */
    constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
        this.createForm();
        this.setMessage();
    }

    /**
     * Creates the login form with the validators
     *
     * @return void
     */
    createForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email] ],
            password: ['', [Validators.required, Validators.minLength(8)] ],
        });
    }

    /**
     * Sets the appropriate message depending on user authentication status
     *
     * @return void
     */
    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    /**
     * Authenticate the visitor and redirects to the home page if successful
     *
     * @return void
     */
    login() {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home-teacher';
                this.router.navigate([redirect]);
            }
        });
    }

    /**
     * Disconnects the user
     *
     * @return void
     */
    logout() {
        this.authService.logout();
        this.setMessage();
    }

    /**
     * Gets the CSS class depending on the formControl status
     *
     * @param {string} formControl
     * @returns {string}
     */
    getAddOnClass(formControl: string): string {
        const control = this.loginForm.get(formControl);
        if (control.valid && control.dirty) {
            return 'add-on-valid';
        }
        if (control.invalid && control.dirty) {
            return 'add-on-error';
        }
    }

    /**
     * Defines if an error message should be shown depending on control and error
     *
     * @param {string} formControl
     * @param {string} error
     * @returns {boolean}
     */
    showError(formControl: string, error: string): boolean {
        const control = this.loginForm.get(formControl);
        return control.hasError(error) && control.dirty;
    }
}
