import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains:string[]): ValidatorFn{
    const domainStr = domains.join('|')
    const regExp = new RegExp (`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.(${domainStr})$`);
    

    return(control)=>{
      const value = control.value || '';
      if(!value){
        return null;
      }
      const isValid = regExp.test(value);
      return isValid ? null: { appEmailValidation:true }
    }
}