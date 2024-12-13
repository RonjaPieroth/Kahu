import {AbstractControl, FormArray, ValidationErrors} from '@angular/forms';

export function minSelectedCheckboxes(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray) {
      const selectedCount = control.controls.filter(ctrl => ctrl.value).length;
      return selectedCount >= min ? null : { minSelected: { required: min, actual: selectedCount } };
    }
    return null;
  };
}
