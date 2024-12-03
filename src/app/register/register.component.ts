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
  @ViewChild('registerForm') form: NgForm | undefined;
  @ViewChild('profilePicInput') profilePicInput?: ElementRef<HTMLInputElement>
  constructor(private regService:UserService,private router:Router){

  }

  register():void{
    const form = this.form!;
    const email = form.value.email;
    const username = form.value.username;
    const password = form.value.password;
    const bio = form.value.bio;
    this.regService.createUser(email,password,username,bio);
    form?.reset();
    
  }

  
}
