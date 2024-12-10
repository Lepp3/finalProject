import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailValidationDirective } from '../directives/email-validation.directive';
import { DOMAINS } from '../utils/constants';
import { PasswordMatchValidatorDirective } from '../directives/passwordMatch.validator.directive';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,EmailValidationDirective,PasswordMatchValidatorDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  domains = DOMAINS;
  errorMessage: string | null = null;
  buttonDisabled: boolean = false;
  waitTimer:number = 5;

  @ViewChild('registerForm') form: NgForm | undefined;
  constructor(private regService:UserService,private router:Router){

  }

  register():void{
    const form = this.form;
    if(form?.invalid){
      console.log('invalid form');
      return
    }
    const email = form?.value.email;
    const username = form?.value.username;
    const password = form?.value.password;
    const bio = form?.value.bio;
    this.regService.createUser(email,password,username,bio).subscribe({
      complete: ()=>{
        this.router.navigate(['/home']);
      },
      error: (err)=>{
        if(err.status === 500 || err.status === 503){
          this.errorMessage = 'Please try again';
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
        }
        if(err.status === 400){
          this.errorMessage = 'Email already in use!';
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);
          form?.reset();
          
        }if(err.status === 429){
          this.errorMessage = `Too many attempts made, try again in ${this.waitTimer} seconds`;
          this.buttonDisabled = true;
          setTimeout(() => {
            this.buttonDisabled = false;
          }, this.waitTimer * 1000);
          this.waitTimer *= 2;
          form?.reset();
        }
      }
    }
    )
    
    
  }

  
}
