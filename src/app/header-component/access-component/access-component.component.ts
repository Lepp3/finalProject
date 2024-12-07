import {  ChangeDetectorRef, Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { combineLatest, Subscription } from 'rxjs';
import { SignedUser } from '../../user-profile/models/userModel';



@Component({
  selector: 'app-access-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './access-component.component.html',
  styleUrl: './access-component.component.css'
})
export class AccessComponent implements OnInit{
  isLoggedIn:boolean = false;
  userName: string | null = null;
  currentUser: SignedUser | null = null;
  private subscriptions: Subscription = new Subscription();
  
  
  
  constructor(private logCheck:UserService,private router:Router,private cdr:ChangeDetectorRef){
    
  }

  ngOnInit(): void {
   
    const userState$ = combineLatest([
      this.logCheck.user$,
      this.logCheck.userInfo$
    ]);

    const sub = userState$.subscribe(([user,userInfo])=>{
      this.isLoggedIn = !!user;
      this.userName = userInfo?.username || null;
      
    })

    this.subscriptions.add(sub);
    this.currentUser = this.logCheck.user;
  

    
  }


  logout():void{
    this.logCheck.signOutUser()
    this.router.navigate(['/home']);
  }

  


  

}
