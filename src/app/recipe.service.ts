import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleComment, SingleRecipe } from './catalog/models/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  headers = {
    'Content-Type': 'application.json'
  }

  constructor( private http:HttpClient) { }


  getAllRecipes(){
    return this.http.get<SingleRecipe[]>('/api/recipes.json');
  }


  getSingleRecipe(recipeId:string){
    return this.http.get<SingleRecipe>(`/api/recipes/${recipeId}.json`)
  }

  likeRecipe(recipeId:string,userId:string){
    //todo check if likes exist, if it DOESNT PATCH TO RECIPES/RECIPEID {likes:{userid:true}} IF IT DOES PATCH TO RECIPES/RECIPEID/LIKES {userid:true}
    console.log(userId)
    const requestBody = {
      userId:true
    }
    return this.http.patch(`/api/recipes/${recipeId}/likes.json`,requestBody,{
      headers: this.headers
    })
  }

  createRecipe(recipe:SingleRecipe,recipeId:string){
    const requestBody = {
      [recipeId]:recipe
    }
    return this.http.patch('/api/recipes.json' ,requestBody,{
      headers: this.headers
    })
  }

  updateRecipe(recipe:SingleRecipe,recipeId:string){
    const requestBody = {
      [recipeId]:recipe
    }
    return this.http.patch('/api/recipes.json' ,requestBody,{
      headers: this.headers
    })
  }

  deleteRecipe(recipeId:string){
    console.log('delete recipe service works')
    return this.http.delete(`/api/recipes/'${recipeId}.json`)
  }

  createComment(comment:SingleComment,commentId:string,recipeId:string){
    const requestBody = {
      [commentId]:comment
    }
    return this.http.patch(`/api/recipes/${recipeId}/comments.json`,requestBody,{
      headers:this.headers
    })
  }

  editComment(){

  }

  deleteComment(recipeId:string,commentId:string){
    console.log(commentId);
    return this.http.delete(`/api/recipes/${recipeId}/comments/${commentId}.json`).subscribe()
  }

  isRecipeAuthor(recipeId:string,userId?:string){
    if(!userId){
      return false;
    }
    return recipeId === userId
    
  }
}
