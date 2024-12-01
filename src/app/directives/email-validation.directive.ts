import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailValidator } from '../utils/email.validation';


@Directive({
  selector: '[appEmailValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EmailValidationDirective
    }
  ]
})
export class EmailValidationDirective implements Validator {
  
  constructor() { }

  @Input() appEmailValidation: string[] = []

  validate(control: AbstractControl): ValidationErrors | null {
    
    const validatorFn = emailValidator(this.appEmailValidation);
    return validatorFn(control);
  }
}
