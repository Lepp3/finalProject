import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header-component/header-component.component';
import { UserService } from './user.service';
import { AuthenticateComponent } from "./authenticate/authenticate.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthenticateComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'finalProject';

 
}
