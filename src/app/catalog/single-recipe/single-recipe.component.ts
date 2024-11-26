import { Component, Input } from '@angular/core';
import { SingleRecipe,SingleComment } from '../models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css'
})
export class SingleRecipeComponent {
@Input('singleRecipe') recipe:SingleRecipe | null=null;

getComments(): SingleComment[] {
  if (!this.recipe?.comments) {
    return [];
  }
  return Object.values(this.recipe.comments);
}

getLikes(){
  if(!this.recipe?.likes){
    return[];
  }
  return Object.values(this.recipe.likes)
}


}
