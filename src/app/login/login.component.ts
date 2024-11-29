import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { EmailValidationDirective } from '../directives/email-validation.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,EmailValidationDirective],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') form:NgForm | undefined;
  constructor(private logged:UserService){

  }

  login(){
    const form = this.form!;
    if(form?.invalid){
      console.log('invalid form');
      return
    }
    console.log(form.value.email); 
    form?.reset()
    }
}
