import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './utils/endpoints';
import { SingleComment, SingleRecipe } from './catalog/models/recipe.model';
import { map } from 'rxjs';

@Injectable()
export class RecipeService {

  headers = {
    'Content-Type': 'application.json'
  }

  constructor( private http:HttpClient) { }


  getAllRecipes(){
    return this.http.get<SingleRecipe[]>(environment.apiUrl + 'recipes.json');
  }


  getSingleRecipe(recipeId:string){
    return this.http.get<SingleRecipe>(environment.apiUrl+`recipes/${recipeId}.json`)
  }

  likeRecipe(recipeId:string,userId:string){
    //todo check if likes exist, if it DOESNT PATCH TO RECIPES/RECIPEID {likes:{userid:true}} IF IT DOES PATCH TO RECIPES/RECIPEID/LIKES {userid:true}
    console.log(userId)
    const requestBody = {
      userId:true
    }
    return this.http.patch(environment.apiUrl+'recipes/' + recipeId + '/likes.json',requestBody,{
      headers: this.headers
    })
  }

  createRecipe(recipe:SingleRecipe,recipeId:string){
    const requestBody = {
      [recipeId]:recipe
    }
    return this.http.patch(environment.apiUrl + 'recipes.json' ,requestBody,{
      headers: this.headers
    })
  }

  editRecipe(recipe:SingleRecipe,recipeId:string){
    const requestBody = {
      [recipeId]:recipe
    }
    return this.http.patch(environment.apiUrl + 'recipes.json' ,requestBody,{
      headers: this.headers
    })
  }

  deleteRecipe(recipeId:string){
    console.log('delete recipe service works')
    return this.http.delete(environment.apiUrl+'recipes/'+recipeId+'.json')
  }

  createComment(comment:SingleComment,commentId:string,recipeId:string){
    const requestBody = {
      [commentId]:comment
    }

    return this.http.patch(environment.apiUrl + 'recipes/' + recipeId + '/comments/.json',requestBody,{
      headers:this.headers
    }).subscribe()
  }

  editComment(){

  }

  deleteComment(recipeId:string,commentId:string){
    return this.http.delete(environment.apiUrl+'recipes/'+recipeId+'/comments/'+commentId+'.json').subscribe()
  }

  isRecipeAuthor(recipeId:string,userId:string){
    return this.http.get<SingleRecipe>(environment.apiUrl+'recipes/'+recipeId+'.json').pipe(
      map(recipe=>recipe.authorId == userId)
    )
  }
}
