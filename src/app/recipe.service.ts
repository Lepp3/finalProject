import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './endpoints';
import { SingleRecipe } from './catalog/models/recipe.model';

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
    console.log(userId)
    const requestBody = {
      userId:true
    }
    return this.http.put(environment.apiUrl+'/recipes/' + recipeId + '/likes.json',requestBody,{
      headers: this.headers
    })
  }

  createRecipe(){

  }

  editRecipe(){

  }

  deleteRecipe(){

  }

  createComment(){

  }

  editComment(){

  }

  deleteComment(){
    
  }
}
