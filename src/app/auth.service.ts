import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    /**
     * Defines if the user is logged in
     *
     * @type {boolean}
     */
    isLoggedIn = false;

    /**
     * This URL is used to redirect the user in case the authentication is successful
     *
     * @type {string}
     */
    redirectUrl: string;

    /**
     * This method will check the connection status for a specific user
     *
     * @returns {Observable<boolean>}
     */
    login(): Observable<boolean> {
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    /**
     * Using this method will disconnect the user
     *
     * @returns void
     */
    logout(): void {
        this.isLoggedIn = false;
    }
}
