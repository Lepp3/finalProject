import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingleRecipe } from './models/recipe.model';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { RecipeService } from '../recipe.service';
import { RouterLink } from '@angular/router';





@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [SingleRecipeComponent,RouterLink],
  providers:[RecipeService,],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{

  recipes:SingleRecipe[] = [];
  filteredRecipes: SingleRecipe[] = [];

constructor(private recService:RecipeService){}

ngOnInit(): void {
  this.recService.getAllRecipes().subscribe(data=>{
    this.recipes = Object.values(data);
    this.filteredRecipes = Object.values(data);
   });

   
   
   
   
}


filterByInput(filter:HTMLInputElement,searchParam:string){
  if(!searchParam){
    return
  }
this.filteredRecipes = this.recipes.filter(recipe=>recipe.title.toLowerCase().includes(searchParam.toLowerCase()))
filter.value = '';
}

mostLiked(){

}

mostCommented(){

}

newest(){
  this.filteredRecipes.sort((a,b)=>{
    const timeA = Number(a.timestamp || 0);
    const timeB = Number(b.timestamp || 0);
    return timeB - timeA
  })
}

oldest():void{
  this.filteredRecipes.sort((a,b)=>{
    const timeA = Number(a.timestamp || 0);
    const timeB = Number(b.timestamp || 0);
    return timeA - timeB
  })
}




}
