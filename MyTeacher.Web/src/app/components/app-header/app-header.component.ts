import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
   selector: 'app-header',
   templateUrl: './app-header.component.html',
   styleUrls: ['../../app.component.scss']
})
export class AppHeader  {

   constructor(
      public authService: AuthService,
      private router: Router
   ) 
   {
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
