import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit,OnDestroy{

  isAuthenticating = true;

  private userSubscription: Subscription | null = null;

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.userService.initializeUserState();
    this.userSubscription = this.userService.user$.subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error:()=>{
        this.isAuthenticating = false;
      },
      complete: ()=>{
        this.isAuthenticating = false;
      }
        

    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
