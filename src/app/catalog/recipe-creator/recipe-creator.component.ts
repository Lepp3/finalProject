import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Details, SingleRecipe } from '../models/recipe.model';
import { v4 as uuidv4 } from 'uuid';
import { RecipeService } from '../../recipe.service';

import { UserService } from '../../user.service';
import { UserInfo } from '../../user-profile/models/userModel';


@Component({
  selector: 'app-recipe-creator',
  standalone: true,
  imports: [FormsModule],
  providers: [RecipeService],
  templateUrl: './recipe-creator.component.html',
  styleUrl: './recipe-creator.component.css'
})
export class RecipeCreatorComponent {
  @ViewChild('creationForm') form: NgForm | undefined;
  
  user: UserInfo | null = null;

  constructor(private publisher:RecipeService, private router:Router, private userService:UserService){
    
  }
  
  

  createRecipe():void{
    const form = this.form!;
    const id = String(uuidv4());
    const authorUsername = 'ivan'
    const authorId = 'ivanid'
    const timestamp = String(Date.now());
    const recipeTitle = form.value.title;
    const ingredients = form.value.ingredients.split(' ');
    const fullRecipe = form.value.fullRecipe;
    const shortInfo = form.value.fullRecipe;
    const image = form.value.image;
    const details:Details = {
      fullRecipe: fullRecipe,
      ingredients: ingredients
    }
    const recipe:SingleRecipe = {
      title:recipeTitle,
      shortInfo: shortInfo,
      timestamp: timestamp,
      details: details,
      authorId: authorId,
      authorUsername: authorUsername,
      imageSrc: image,
      recipeId: id
    }
    this.publisher.createRecipe(recipe,id).subscribe(()=>{
      this.router.navigate(['/recipes']);
    })
    
  }
}
