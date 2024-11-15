import { Component } from '@angular/core';
import { AccessComponentComponent } from './access-component/access-component.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LogoComponentComponent } from './logo-component/logo-component.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [AccessComponentComponent,
    NavigationMenuComponent,
    LogoComponentComponent
  ],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {

}
