import {  ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-access-component',
  standalone: true,
  imports: [RouterLink,AsyncPipe],
  
  templateUrl: './access-component.component.html',
  styleUrl: './access-component.component.css'
})
export class AccessComponent implements OnInit{
  isLoggedIn!:boolean
  
  
  
  constructor(private logCheck:UserService,private router:Router,private cdr:ChangeDetectorRef){
    
  }

  ngOnInit(): void {
    this.isLoggedIn = this.logCheck.isLogged;
    console.log(this.isLoggedIn);
    this.cdr.detectChanges();
  
    
  }


  logout():void{
    this.logCheck.signOutUser()
    this.router.navigate(['/home']);
    console.log(this.logCheck.isLogged);
    // this.logCheck.isLogged$.subscribe(val => console.log('Logged in state:', val));
  }

  


  

}
