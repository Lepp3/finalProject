import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') form: NgForm | undefined;
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
      }
    })
    }
}
