import {  AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator():ValidatorFn{
    
    return (control: AbstractControl):ValidationErrors | null =>{
        let isValid = false;
        const password = control.get('password')?.value;
        const repass = control.get('rePassword')?.value;
        if(password && repass){
            isValid = password === repass
        }
        return isValid? null : {appPasswordMatchValidation: true}
    }
    
}