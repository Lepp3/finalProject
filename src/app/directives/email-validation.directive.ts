import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


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
  pattern:RegExp = /^[a-zA-Z0-9_.-]+@(gmail\.com|abv\.bg)$/
  constructor() { }

  @Input() emailValidator: string | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('Control Value:',control.value);
    // TODO: IMPLEMENT IF CONDITIONS FOR EMAIL MATCHING
    return null
  }
}
