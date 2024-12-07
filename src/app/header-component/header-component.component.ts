import { Component, OnInit } from '@angular/core';
import { AccessComponent } from './access-component/access-component.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LogoComponent } from './logo-component/logo-component.component';
import { UserService } from '../user.service';
import { Router} from '@angular/router';
import { catchError, combineLatest, Subscription, tap } from 'rxjs';
import { SignedUser } from '../user-profile/models/userModel';

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
export class HeaderComponent {

}
