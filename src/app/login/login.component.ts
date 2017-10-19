import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
     * Constructor injects the Auth Service and the router
     *
     * @param {AuthService} authService
     * @param {Router} router
     * @return void
     */
    constructor(public authService: AuthService, public router: Router) {
        this.setMessage();
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
}
