import { Component, OnInit } from '@angular/core';
import { Student } from '../data-model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss', '../app.component.scss']
})
export class StudentListComponent implements OnInit {

  STUDENTS: Student[] = [
      {id: 1, firstName: 'Patrick', lastName: 'Smith', instrument: 'Guitar', thumbnail: '1.png'},
      {id: 2, firstName: 'Mike', lastName: 'Doughy', instrument: 'Bass', thumbnail: '2.png'},
      {id: 3, firstName: 'Bart', lastName: 'Astor', instrument: 'Ukulele', thumbnail: '3.png'},
      {id: 4, firstName: 'Mary', lastName: 'Shelley', instrument: 'Guitar', thumbnail: '4.png'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
