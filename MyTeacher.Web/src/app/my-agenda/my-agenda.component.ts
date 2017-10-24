import { Component, OnInit } from '@angular/core';
import {TimeSlot} from "../data-model/time-slot";

@Component({
  selector: 'app-my-agenda',
  templateUrl: './my-agenda.component.html',
  styleUrls: ['./my-agenda.component.scss', '../app.component.scss', '../../sass/form.scss']
})
export class MyAgendaComponent implements OnInit {

  TimeSlots: TimeSlot[] = [
      {id: 1, firstName: 'Patrick', lastName: 'Smith', from: '9:00', to: '10h30', thumbnail: '1.png'},
      {id: 2, firstName: 'Bart', lastName: 'Astor', from: '12:00', to: '13h30', thumbnail: '3.png'},
      {id: 3, firstName: 'Mary', lastName: 'Shelley', from: '18:00', to: '19h30', thumbnail: '4.png'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
