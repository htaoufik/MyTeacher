import { Component } from '@angular/core';
import { Teacher } from '../data-model/teacher';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { InputAddOnService } from '../../services/input-add-on.service';

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
     * @param {InputAddOnService} addOnService
     */
    constructor(private fb: FormBuilder, public addOnService: InputAddOnService) {
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
}
