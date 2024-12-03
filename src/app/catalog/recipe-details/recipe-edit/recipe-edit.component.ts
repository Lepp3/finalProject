import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleRecipe } from '../../models/recipe.model';
import { RecipeService } from '../../../recipe.service';
import { FormsModule, NgForm } from '@angular/forms';

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
  currentRecipe: SingleRecipe | null = null;
  @ViewChild('editForm') form!:NgForm

  constructor(
    private activeRout:ActivatedRoute,
    private recService:RecipeService
  ){

  }
  ngOnInit(): void {
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
    })
  }

  onEditSubmit():void{

  }
}
