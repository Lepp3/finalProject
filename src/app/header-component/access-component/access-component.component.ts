import { Component, OnInit, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-access-component',
  standalone: true,
  imports: [RouterLink,AsyncPipe],
  templateUrl: './access-component.component.html',
  styleUrl: './access-component.component.css'
})
export class AccessComponentComponent implements OnInit{
  isLoggedIn!:Observable<boolean>
  
  constructor(private logCheck:UserService,private router:Router){
    
  }

  ngOnInit(): void {
    this.isLoggedIn = this.logCheck.isLogged$;
    console.log(this.isLoggedIn);
  }


  logout():void{
    this.logCheck.signOutUser();
    this.router.navigate(['/home']);
    this.logCheck.isLogged$.subscribe(val => console.log('Logged in state:', val));
  }

  login():void{
    this.logCheck.testSign();
    this.router.navigate(['/home']);
    this.logCheck.isLogged$.subscribe(val => console.log('Logged in state:', val));
  }


  

}
