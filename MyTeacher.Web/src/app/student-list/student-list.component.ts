import { Component, OnInit } from '@angular/core';
import { Student } from '../data-model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss', '../app.component.scss', '../../sass/form.scss']
})
export class StudentListComponent implements OnInit {

  STUDENTS: Student[] = [
      {id: 1, firstName: 'Patrick', lastName: 'Smith', instrument: 'Guitar', thumbnail: '1.png', picture: '1.jpg'},
      {id: 2, firstName: 'Mike', lastName: 'Doughy', instrument: 'Bass', thumbnail: '2.png', picture: '2.jpg'},
      {id: 3, firstName: 'Bart', lastName: 'Astor', instrument: 'Ukulele', thumbnail: '3.png', picture: '3.jpg'},
      {id: 4, firstName: 'Mary', lastName: 'Shelley', instrument: 'Guitar', thumbnail: '4.png', picture: '4.jpg'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
