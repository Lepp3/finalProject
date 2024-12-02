import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './utils/endpoints';
import { SingleComment, SingleRecipe } from './catalog/models/recipe.model';

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
    return this.http.patch(environment.apiUrl+'/recipes/' + recipeId + '/likes.json',requestBody,{
      headers: this.headers
    })
  }

  createRecipe(recipe:SingleRecipe,recipeId:string){
    const requestBody = {
      [recipeId]:recipe
    }
    return this.http.patch(environment.apiUrl + '/recipes.json' ,requestBody,{
      headers: this.headers
    }).subscribe()
  }

  editRecipe(){
    //TODO IMPLEMENT EDIT OF SPECIFIC CHILDREN USING PATCH (all properties not mentioned are not deleted)
  }

  deleteRecipe(recipeId:string){
    return this.http.delete(environment.apiUrl+'/recipes/'+recipeId+'.json').subscribe()
  }

  createComment(comment:SingleComment,commentId:string){

  }

  editComment(){

  }

  deleteComment(recipeId:string,commentId:string){
    return this.http.delete(environment.apiUrl+'/recipes/'+recipeId+'/comments/'+commentId+'.json').subscribe()
  }
}
