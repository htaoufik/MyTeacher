import { FormGroup} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class InputAddOnService {

    /**
     * Gets the CSS class depending on the formControl status
     *
     * @param {FormGroup} formGroup
     * @param {string} formControl
     * @return {string}
     */
    getAddOnClass(formGroup: FormGroup, formControl: string): string {
        const control = formGroup.get(formControl);
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
     * @param {FormGroup} formGroup
     * @param {string} formControl
     * @param {string} error
     * @returns {boolean}
     */
    showError(formGroup: FormGroup, formControl: string, error: string): boolean {
        const control = formGroup.get(formControl);
        return control.hasError(error) && control.dirty;
    }
}
