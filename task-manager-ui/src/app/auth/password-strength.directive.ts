import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

/** The password must have at least one uppercase character */
export const oneUppercase: ValidatorFn = passwordStrengthValidator(/^(?=.*[A-Z]).+$/, 'oneUppercase')

/** The password must have at least one lowercase character */
export const oneLowercase: ValidatorFn = passwordStrengthValidator(/^(?=.*[a-z]).+$/, 'oneLowercase')

/** The password must have at least one special character */
export const oneSpecial: ValidatorFn = passwordStrengthValidator(/^(?=.*[^a-zA-Z0-9]).+$/, 'oneSpecial')

/** The password must have at least one numeric character */
export const oneNumeric: ValidatorFn = passwordStrengthValidator(/^(?=.*[0-9]).+$/, 'oneNumeric')

function passwordStrengthValidator(regex: RegExp, errorName: string = 'weakPassword'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = regex.test(control.value)
    return valid ? null : { [errorName]: { value: control.value } }
  }
}
