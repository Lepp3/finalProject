import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleComment, SingleRecipe } from '../catalog/models/recipe.model';
import { catchError, throwError } from 'rxjs';


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
    const requestBody = {
      [userId]:true
    }
    return this.http.patch(`/api/recipes/${recipeId}/likes.json`,requestBody,{
      headers: this.headers
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  createRecipe(recipe:SingleRecipe,recipeId:string){
    const requestBody = {
      [recipeId]:recipe
    }
    return this.http.patch('/api/recipes.json' ,requestBody,{
      headers: this.headers
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
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
    return this.http.delete(`/api/recipes/${recipeId}.json`)
  }

  createComment(comment:SingleComment,commentId:string,recipeId:string){
    const requestBody = {
      [commentId]:comment
    }
    return this.http.patch(`/api/recipes/${recipeId}/comments.json`,requestBody,{
      headers:this.headers
    })
  }

  likeComment(recipeId:string,commentId:string,likerId:string){
    const requestBody = {
        [likerId]: true
      
    }

    return this.http.patch(`/api/recipes/${recipeId}/comments/${commentId}/likes.json`,requestBody,{
      headers: this.headers
    }).subscribe();
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
