import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { catchError, throwError } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') form: NgForm | undefined;

  errorMessage: string | null = null;
  buttonDisabled: boolean = false;
  waitTimer: number = 5;

  constructor(private logged:UserService, private router:Router){

  }

 
  login(){
    const form = this.form;

    if(form?.invalid){
      console.log('invalid form');
      return
    }
    const email = form?.value.email;
    const password = form?.value.password;

    this.logged.signInUser(email,password).subscribe({
      complete: ()=>{
        this.router.navigate(['/home']);
      },
      error: (err)=>{
        if(err.status === 500){
          this.errorMessage = 'Please try again';
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
        
        }
        if(err.status === 400){
          this.errorMessage = 'Invalid login credentials';
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);
          
        }
        if(err.status === 429){
          this.errorMessage = `Too many attempts made, try again in ${this.waitTimer} seconds`;
          this.buttonDisabled = true;
          setTimeout(() => {
            this.buttonDisabled = false;
          }, this.waitTimer * 1000);
          this.waitTimer *= 2;
          
        }
      }
      
    })
    }
}
