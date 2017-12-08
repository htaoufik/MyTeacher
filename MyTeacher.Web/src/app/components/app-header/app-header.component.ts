import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
   selector: 'app-header',
   templateUrl: './app-header.component.html',
   styleUrls: ['../../app.component.scss']
})
export class AppHeaderComponent  {
    /**
     * User authentication status
     */
    isConnected: boolean;

    constructor(
        public authService: AuthService,
        private router: Router
    ) {
        this.isConnected = AuthService.isLoggedIn();
    }

    /**
    * Disconnects the user
    *
    * @return void
    */
    logout(): void {
        this.authService.logout().subscribe(() => { this.router.navigate(['/login']); });
    }
}
