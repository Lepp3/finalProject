import { Directive } from "@angular/core";
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from "@angular/forms";
import { passwordMatchValidator } from "../utils/password.validation";



@Directive({
    selector: '[appPasswordMatchValidation]',
    standalone: true,
    providers: [
        {
          provide: NG_VALIDATORS,
          multi: true,
          useExisting: PasswordMatchValidatorDirective
        }
      ]
})
export class PasswordMatchValidatorDirective implements Validator{
    private valFn = passwordMatchValidator();
    constructor(){
       
    }

    validate(control: AbstractControl): ValidationErrors | null {
        
        return this.valFn(control)
    }
}