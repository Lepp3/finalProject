import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Details, Likes, SingleRecipe } from '../../models/recipe.model';
import { RecipeService } from '../../../recipe.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SignedUser, UserInfo } from '../../../user-profile/models/userModel';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  recipeId!: string;
  currentRecipe!: SingleRecipe;
  currentUser!: SignedUser | null;
  currentUserInfo!: UserInfo | null;
  ingredients!: string | null;
  errorMessage: string | null = null;
  waitTimer: number = 5;
  buttonDisabled: boolean = false;
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
    this.currentUserInfo = this.userService.userInfo;
    this.activeRout.paramMap.subscribe((params)=>{
      this.recipeId = params.get('id') ?? '';
      
    })
    if(this.recipeId){
      this.loadRecipeData();
      
    }
  }

  loadRecipeData(){
    this.recService.getSingleRecipe(this.recipeId).subscribe((recipe)=>{
      if(!recipe){
        this.router.navigate(['/recipes']);
        return
      }
      this.currentRecipe = recipe;
      this.ingredients = recipe.details.ingredients.join(',');
      
    })
  }

  onEditSubmit():void{
    const form = this.form;
    const id = this.recipeId;
    const authorUsername = this.currentUserInfo?.username;
    const authorId = this.currentUser!.localId;
    const timestamp = String(Date.now());
    const recipeTitle = form.value.title;
    let ingredients = form.value.ingredients.split(',');
    ingredients = ingredients.filter((input:string) => input !== " " && input !== "");
    const fullRecipe = form.value.fullRecipe;
    const shortInfo = form.value.shortInfo;
    const image = form.value.image;
    let likes: Likes | undefined = undefined;
    const details: Details = {
      fullRecipe: fullRecipe,
      ingredients: ingredients
    }
    const comments = this.currentRecipe.comments;
    if(this.currentRecipe.likes){
      likes = this.currentRecipe.likes;
    }
    console.log(likes);
    const recipe:SingleRecipe = {
      title:recipeTitle,
      shortInfo: shortInfo,
      timestamp: timestamp,
      details: details,
      authorId: authorId,
      authorUsername: authorUsername || "",
      imageSrc: image,
      recipeId: id,
      comments: comments,
      likes: likes
    }
    
    this.recService.updateRecipe(recipe,id).subscribe({
      complete:()=>{
        this.router.navigate([`/recipes/details/${this.recipeId}`]);
      },
      error: (err)=>{
        if(err.status === 403){
          this.userService.signOutUser();
          return
        }
        if(err.status === 400){
          this.errorMessage = `${err.message}`;
          this.buttonDisabled = true;
          setTimeout(() => {
            this.errorMessage = null;
            this.buttonDisabled = false;
          }, this.waitTimer * 1000);
          this.waitTimer *= 2;
          return
        }
      }
    });
    
  }
}
