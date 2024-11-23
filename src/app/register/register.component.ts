import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  providers: [UserService,HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  constructor(private test:UserService){

  }

  testRegister():void{
    this.test.createUser()
  }
  // ngOnInit(): void {
    
  // }

  
}
