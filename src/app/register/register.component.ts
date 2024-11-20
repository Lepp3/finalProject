import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  providers: [FirebaseService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private fireBaseService: FirebaseService){}

  ngOnInit(): void {
    
  }

  
}
