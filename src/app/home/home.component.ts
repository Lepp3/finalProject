import { Component, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  providers: [RecipeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
}
