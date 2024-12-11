import { Component, Input } from '@angular/core';
import { SingleComment, SingleRecipe } from '../../catalog/models/recipe.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posted-recipe',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './posted-recipe.component.html',
  styleUrl: './posted-recipe.component.css'
})
export class PostedRecipeComponent {
  @Input ('postedRecipe') recipe!:SingleRecipe;
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

  setDefaultImage(event: Event){
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-image.png';
  }
}
