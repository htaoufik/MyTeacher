import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputAddOnService } from '../../services/input-add-on.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../app.component.scss', '../../sass/form.scss']
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

    // inputAddOnInstance = InputAddOnService.getInstance();

    /**
     * Constructor injects the Auth Service and the router
     *
     * @param {AuthService} authService
     * @param {Router} router
     * @param {FormBuilder} fb
     * @param {InputAddOnService} addOnService
     * @return void
     */
    constructor(
        public authService: AuthService,
        public router: Router,
        private fb: FormBuilder,
        public addOnService: InputAddOnService
    ) {
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
    login(): void {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                localStorage.setItem('isAuthenticated', 'true');
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
    logout(): void {
        this.authService.logout();
        localStorage.setItem('isAuthenticated', 'false');
        this.setMessage();
    }
}
