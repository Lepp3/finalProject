import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') form:NgForm | undefined;
  constructor(private logged:UserService, private router:Router){

  }

  login():void{
    const form = this.form!;
    const email = form.value.email;
    const password = form.value.password;
    this.logged.signInUser(email,password).pipe(
      delay(500)
    ).subscribe({
      next: ()=>{
        this.router.navigate(['/home']);
      },error: (err)=>{
        console.error('login failed', err);
      }
    })

    // this.logged.signInUser(email,password);
    
    // this.router.navigate(['/home']);
    // form?.reset()
    
    }
}
