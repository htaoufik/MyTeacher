import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
      this.setMessage();
  }

  setMessage() {
      this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

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

  logout() {
      this.authService.logout();
      this.setMessage();
  }
  ngOnInit() {
  }

}
