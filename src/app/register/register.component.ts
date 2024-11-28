import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  providers: [UserService,HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  constructor(private test:UserService){

  }

  testRegister():void{
    
  }
  // ngOnInit(): void {
    
  // }

  
}
