import { Component, OnInit } from '@angular/core';
import { AccessComponent } from './access-component/access-component.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LogoComponent } from './logo-component/logo-component.component';
import { UserService } from '../user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [AccessComponent,
    NavigationMenuComponent,
    LogoComponent,
  ],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private logState:UserService,private router:Router){

  }

  ngOnInit(): void {
    this.isLoggedIn = this.logState.isLogged;

  }

  logout():void{
    this.logState.signOutUser();
    this.router.navigate(['/home']);
    console.log(this.logState.isLogged);
  }
}
