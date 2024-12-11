import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Details, SingleRecipe } from '../models/recipe.model';
import { v4 as uuidv4 } from 'uuid';
import { RecipeService } from '../../recipe.service';

import { UserService } from '../../user.service';
import { SignedUser, UserInfo } from '../../user-profile/models/userModel';



@Component({
  selector: 'app-recipe-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-creator.component.html',
  styleUrl: './recipe-creator.component.css'
})
export class RecipeCreatorComponent implements OnInit{
  @ViewChild('creationForm') form!: NgForm
  
  currentUser!: SignedUser | null;
  userInfo!: UserInfo | null;

  errorMessage: string | null = null;
  waitTimer: number = 5;
  buttonDisabled: boolean = false;

  constructor(private publisher:RecipeService, private router:Router, private userService:UserService){
    
  }
  
  ngOnInit(): void {
    this.currentUser = this.userService.user;
    this.userInfo = this.userService.userInfo
    
  }

  

  createRecipe():void{
    const form = this.form;
    if(form?.invalid){
      console.log('invalid form');
      return;
    }
    const id = String(uuidv4());
    const authorUsername = this.userInfo!.username;
    const authorId = this.currentUser!.localId;
    const timestamp = String(Date.now());
    const recipeTitle = form.value.title;
    const ingredients = form.value.ingredients.split(',');
    const fullRecipe = form.value.fullRecipe;
    const shortInfo = form.value.fullRecipe;
    const image = form?.value.image;
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
    this.publisher.createRecipe(recipe,id).subscribe({
      complete: ()=>{
        this.router.navigate(['/recipes']);
      },
      error: (err)=>{
        if(err.status === 403){
          this.userService.signOutUser();
          return
        }
        if(err.status === 429){
          this.errorMessage = `Too many attempts made, try again in ${this.waitTimer} seconds`;
          this.buttonDisabled = true;
          setTimeout(() => {
            this.buttonDisabled = false;
          }, this.waitTimer * 1000);
          this.waitTimer *= 2;
          return
        }
      }
    })
    
  }
}
