import { Component } from '@angular/core';
import { Teacher } from '../data-model/teacher';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss', '../app.component.scss']
})

export class RegistrationFormComponent {

    /**
     * The registration form
     *
     * @type FormGroup
     */
    registrationForm: FormGroup;

    /**
     * Constructor injects the FormBuilder
     *
     * @param {FormBuilder} fb
     */
    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    /**
     * Creates the registration form with the validators
     *
     * @return void
     */
    createForm(): void {
        this.registrationForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)] ],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email] ],
            password: ['', [Validators.required, Validators.minLength(8)] ],
        });
    }

    /**
     * Gets the CSS class depending on the formControl status
     *
     * @param {string} formControl
     * @returns {string}
     */
    getAddOnClass(formControl: string): string {
        const control = this.registrationForm.get(formControl);
        if (control.valid && control.dirty) {
            return 'add-on-valid';
        }
        if (control.invalid && control.dirty) {
            return 'add-on-error';
        }
    }

    /**
     * Defines if an error message should be shown depending on control and error
     *
     * @param {string} formControl
     * @param {string} error
     * @returns {boolean}
     */
    showError(formControl: string, error: string): boolean {
        const control = this.registrationForm.get(formControl);
        return control.hasError(error) && control.dirty;
    }
}
