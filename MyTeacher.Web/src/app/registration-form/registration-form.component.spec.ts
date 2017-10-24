import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [ RegistrationFormComponent ]
    })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('form invalid when empty', () => {
        expect(component.registrationForm.valid).toBeFalsy();
    });

    it('email field should be a real email', () => {
        const email = component.registrationForm.controls['email'];
        email.setValue('test');
        const errors = email.errors || {};
        expect(errors['email']).toBeTruthy();
    });

    it('password should be more than 7 characters', () => {
        const password = component.registrationForm.controls['password'];
        password.setValue('1234567');
        const errors = password.errors || {};
        expect(errors['minlength']).toBeTruthy();
    });

    it('form valid when fulfilled with right values', () => {
        const firstName = component.registrationForm.controls['firstName'];
        const lastName = component.registrationForm.controls['lastName'];
        const email = component.registrationForm.controls['email'];
        const password = component.registrationForm.controls['password'];

        firstName.setValue('John');
        lastName.setValue('Doe');
        email.setValue('john.doe@gmail.com');
        password.setValue('12345678');

        expect(component.registrationForm.valid).toBeTruthy();
    });
});
