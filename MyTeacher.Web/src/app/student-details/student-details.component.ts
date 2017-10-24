import { Component, OnInit } from '@angular/core';
import { Student } from '../data-model/student';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

    currentStudent: Observable<Student>;

    private selectedId: number;

    STUDENTS = [
        new  Student(1, 'Patrick', 'Smith', 'Guitar', '1.png', '1.jpg'),
        new Student(2, 'Mike', 'Doughy', 'Bass', '2.png', '2.jpg'),
        new Student(3, 'Bart', 'Astor', 'Ukulele', '3.png', '3.jpg'),
        new Student(4, 'Mary', 'Shelley', 'Guitar', '4.png', '4.jpg')
    ];

    constructor(private route: ActivatedRoute) {}


    /* getStudents() {
        return Observable.of(this.STUDENTS);
    }

    getStudent(id: number | string) {
        return this.getStudent(id).map(heroes => heroes.find(hero => hero.id === +id));
    }*/

    ngOnInit() {
        /*this.currentStudent = this.route.paramMap.switchMap((params: ParamMap) => {
                this.selectedId = +params.get('id');
                return this.getStudent();
            });*/
    }

}
