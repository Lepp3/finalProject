import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { SingleComment, SingleRecipe } from '../models/recipe.model';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommentsComponent],
  providers:[RecipeService],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  recipeId!:string;
  currentRecipe:SingleRecipe | null = null;

  // currentRecipe:SingleRecipe = {
  //     title:'Chicken Parm',
  //     authorUsername: 'The french cook',
  //     authorId:'userId',
  //     shortInfo:'Italian classic',
  //     imageSrc:'https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1.jpg',
  //     details:{
  //       fullRecipe:'cook the chicken untill done', 
  //       ingredients:['chicken','parmesan']},
  //     likes:{
  //       '88fbbf2':true
  //     },
  //     comments:{
  //       '0sBsgnXos':{
  //         authorUsername:'randomusername',
  //         authorId:'88sbbvu3b',
  //         content:'nice meal',
  //         timestamp:'173883776993',
  //         commentId: '9nnge'}},
  //     recipeId: '997ngbueu',
  //     timestamp: '177399363'
  //   }

  constructor(
    private recService:RecipeService,
    private activatedRoute:ActivatedRoute, 
  ){
    // this.recipeId = this.activatedRoute.snapshot.params['id'];
  }

  getComments(): SingleComment[] {
    if (!this.currentRecipe?.comments) {
      return [];
    }
    return Object.values(this.currentRecipe.comments);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.recipeId = params.get('id') ?? '';
    })
    this.recService.getSingleRecipe(this.recipeId).subscribe(recipe=>{
      this.currentRecipe = recipe
      console.log(recipe);
    })
  }

  isOwner():boolean{
    // todo implement a function that hides or shows edit/delete button on authorId and userId check
    return true
  }
}
