import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * Constructor will inject the AuthService and the Router
     *
     * @param {AuthService} authService
     * @param {Router} router
     */
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * The user will not be able to load this component unless he is logged in
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    /**
     * Gets the current user's connection status
     * @param {string} url
     * @returns {boolean}
     */
    checkLogin(url: string): boolean {

        if (this.authService.isLoggedIn) {
            return true;
        }
        if (localStorage.getItem('isAuthenticated') === 'true') {
            return true;
        }
        this.authService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false;
    }
}
