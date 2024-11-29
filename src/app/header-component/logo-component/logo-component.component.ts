import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo-component.component.html',
  styleUrl: './logo-component.component.css'
})
export class LogoComponent {

}
