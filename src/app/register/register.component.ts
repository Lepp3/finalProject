import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  providers: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(){}

  ngOnInit(): void {
    
  }

  
}
