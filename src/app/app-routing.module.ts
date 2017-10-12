import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './not-found.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';

const appRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home-teacher', component: HomeTeacherComponent, canActivate: [AuthGuard]},
    { path: '',   redirectTo: '/home-teacher', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}