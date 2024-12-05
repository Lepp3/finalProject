import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Details, SingleRecipe } from '../../models/recipe.model';
import { RecipeService } from '../../../recipe.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SignedUser } from '../../../user-profile/models/userModel';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [FormsModule],
  providers: [RecipeService],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  recipeId!: string;
  currentRecipe!: SingleRecipe;
  currentUser!: SignedUser | null;
  ingredients!: string | null;
  @ViewChild('editForm') form!:NgForm

  constructor(
    private activeRout:ActivatedRoute,
    private recService:RecipeService,
    private userService: UserService,
    private router:Router
  ){

  }


  ngOnInit(): void {
    this.currentUser = this.userService.user;
    this.activeRout.paramMap.subscribe((params)=>{
      this.recipeId = params.get('id') ?? '';
      console.log(this.recipeId);
    })
    if(this.recipeId){
      this.loadRecipeData();
      
    }
  }

  loadRecipeData(){
    this.recService.getSingleRecipe(this.recipeId).subscribe((recipe)=>{
      this.currentRecipe = recipe;
      this.ingredients = recipe.details.ingredients.join(' ');
      console.log(this.ingredients);
    })
  }

  onEditSubmit():void{
    const form = this.form;
    const id = this.recipeId;
    const authorUsername = "ivan";
    const authorId = this.currentUser!.localId;
    const timestamp = String(Date.now());
    const recipeTitle = form.value.title;
    const ingredients = form.value.ingredients.trim().split(' ');
    const fullRecipe = form.value.fullRecipe;
    const shortInfo = form.value.fullRecipe;
    const image = form.value.image;
    const details: Details = {
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

    console.log(recipe);
    
    this.recService.editRecipe(recipe,id).subscribe({
      next:()=>{
        this.router.navigate([`/recipes/details/${this.recipeId}`]);
      }
    });
    

  }
}
