import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
      './registration.component.scss',
      '../app.component.scss',
      '../../sass/security.scss'
  ],
  animations: [ slideInDownAnimation ]
})

export class RegistrationComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
