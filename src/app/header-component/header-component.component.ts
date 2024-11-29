import { Component } from '@angular/core';
import { AccessComponent } from './access-component/access-component.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LogoComponent } from './logo-component/logo-component.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [AccessComponent,
    NavigationMenuComponent,
    LogoComponent
  ],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponent {

}
