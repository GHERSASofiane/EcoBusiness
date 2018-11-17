import { AbstractControl } from "@angular/forms";

export function validatePassword(control : AbstractControl)
  {
    const controlToCompare = control.root.get('userPassword');

    if(controlToCompare && controlToCompare.value !== control.value)
       return { 'notEqual' : true};

   return null;
  }