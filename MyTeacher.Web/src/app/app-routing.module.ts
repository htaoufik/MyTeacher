import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TeacherAppLayoutComponent } from './teacher-app-layout/teacher-app-layout.component';
import { AuthGuard } from '../services/security/auth-guard.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './not-found.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import {StudentDetailsComponent} from './student-details/student-details.component';
import {StudentListComponent} from './student-list/student-list.component';


const routes: Routes = [
   {
      path: 'teacher',                       
      component: TeacherAppLayoutComponent,
      canActivate: [AuthGuard],        
      children: [
         { path: '', redirectTo: 'home', pathMatch: 'full' },
         { path: 'home', component: HomeTeacherComponent },
         { path: 'students', component: StudentListComponent },
         { path: 'student-details/:id', component: StudentDetailsComponent }
      ]
   },
   {
      path: '',
      component: AppComponent, 
      children: [
         { path: '', canActivate: [AuthGuard], redirectTo: '/teacher/home', pathMatch: 'full' },
         { path: '', redirectTo: '/login', pathMatch: 'full' },
         { path: 'registration', component: RegistrationComponent },
         { path: 'login', component: LoginComponent }
      ]
   }
];


@NgModule({
    imports: [
        RouterModule.forRoot(
           routes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
