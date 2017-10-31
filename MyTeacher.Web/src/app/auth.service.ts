import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { environment } from '../environments/environment'

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


   constructor(private http: HttpClient)
   {
   }

   /**
    * This method will check the connection status for a specific user
    *
    * @returns {Observable<boolean>}
    */
   login(email:string, password:string ): Observable<boolean>
   {
      // TODO: Shall we realy return a boolean observable as we set the isLoggedIn member ?
      var observable: Observable<boolean> = Observable.create( observer =>
      {
         this.http.post(
            environment.apiEndPoints.sessionService,
            { "email": email, "password": password }
         ).subscribe(
            () => { this.isLoggedIn = true; observer.next(true); observer.complete(); },
            () => { this.isLoggedIn = false; observer.next(false); observer.complete();}
          );
      });

      return observable;
   }
   
   /**
    * Using this method will disconnect the user
    *
    * @returns void
    */
   logout(): void
   {
      this.isLoggedIn = false;
   }
}
