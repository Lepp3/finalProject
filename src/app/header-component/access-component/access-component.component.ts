import {  ChangeDetectorRef, Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { AsyncPipe } from '@angular/common';




@Component({
  selector: 'app-access-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './access-component.component.html',
  styleUrl: './access-component.component.css'
})
export class AccessComponent{
 

  constructor(private logCheck:UserService,private router:Router,private cdr:ChangeDetectorRef){
    
  }

  

  
  get isLogged():boolean{
    return this.logCheck.isLogged;
  }

  get username(): string{
    return this.logCheck.userInfo?.username || "";
  }

  get userId():string{
    return this.logCheck.user?.localId || "";
  }

  logout():void{
    this.logCheck.signOutUser()
    this.router.navigate(['/login']);
  }

  


  

}
