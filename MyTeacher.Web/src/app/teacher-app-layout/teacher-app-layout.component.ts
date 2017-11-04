import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { AuthService } from '../auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
   selector: 'app-layout',
   templateUrl: './teacher-app-layout.component.html',
   styleUrls: ['../app.component.scss']
})
export class TeacherAppLayoutComponent implements OnInit {
   title = 'Yeah';
   errorMessage: string;
   images: Array<any> = [];


   constructor(
      public authService: AuthService,
      private fileService: FileService,
      private router: Router
   )
   {
   }

   ngOnInit() { this.getImageData(); }

   refreshImages(status) {
      if (status === true) {
         console.log('Uploaded successfully!');
         this.getImageData();
      }
   }

   getImageData() {
      this.fileService.getImages().subscribe(
         data => { this.images = data.result },
         error => this.errorMessage = error
      );
   }

   /**
   * Disconnects the user
   *
   * @return void
   */
   logout(): void
   {
      this.authService.logout().subscribe(() => { this.router.navigate(['/login']);});
   }
}
