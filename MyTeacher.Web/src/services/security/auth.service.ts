import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    /**
    * This URL is used to redirect the user in case the authentication is successful
    *
    * @type {string}
    */
    redirectUrl: string;

    /**
     * Constructor
     *
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    /**
     * Returns the authentication status
     *
     * @return {boolean}
     */
    public static isLoggedIn(): boolean {
        return localStorage.getItem('isAuthenticated') === 'true';
    }


    /**
    * This method will check the connection status for a specific user
    *
    * @returns {Observable<boolean>}
    */
    login(email: string, password: string ): Observable<boolean> {
        // TODO: Shall we really return a boolean observable as we set the isLoggedIn member ?
        const observable: Observable<boolean> = Observable.create( observer => {
            this.http.post(
                environment.apiEndPoints.sessionService,
            { 'email': email, 'password': password }
            ).subscribe(
                () => {
                    localStorage.setItem('isAuthenticated','true');
                    observer.next(true); observer.complete();
                },
                () => {
                    localStorage.setItem('isAuthenticated', 'false');
                    observer.next(false); observer.complete();
                }
            );
        });

        return observable;
    }
   
    /**
    * Using this method will disconnect the user
    *
    * @returns void
    */
    logout(): Observable<void> {
        // TODO: Shall we really return a boolean observable as we set the isLoggedIn member ?
        const observable: Observable<void> = Observable.create(observer => {
            this.http.delete(
                environment.apiEndPoints.sessionService
            ).subscribe(
                () => {
                   localStorage.setItem('isAuthenticated', 'false');
                   observer.next(); observer.complete(); },
                () => {
                   localStorage.setItem('isAuthenticated', 'false');
                   observer.next(); observer.complete();
                } // TODO what do we do in case of error ? : )
            );
        });
        return observable;
    }
}
