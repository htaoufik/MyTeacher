import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileService } from '../services/file.service';
import { AuthGuard} from './auth-guard.service';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './not-found.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { AppRoutingModule } from './app-routing.module';
import {InputAddOnService} from "../services/input-add-on.service";
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    RegistrationFormComponent,
    RegistrationComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeTeacherComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [FileService, AuthGuard, AuthService, InputAddOnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
