import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SingleComment, SingleRecipe } from '../models/recipe.model';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommentsComponent,FormsModule,RouterLink],
  providers:[RecipeService],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit{

  recipeId!:string;

  currentRecipe:SingleRecipe | null = null;

  allComments:SingleComment[] = [];

  @ViewChild('commentForm') form: NgForm | undefined;

  
  

  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.recipeId = params.get('id') ?? '';
    })
    if(this.recipeId){
      this.loadRecipeData();
    }

  }
  

  constructor(
    private recService:RecipeService,
    private activatedRoute:ActivatedRoute, 
    private router: Router
  ){
    // this.recipeId = this.activatedRoute.snapshot.params['id'];
  }

  getComments(): SingleComment[] {
    if (!this.currentRecipe?.comments) {
      return [];
    }
    return Object.values(this.currentRecipe.comments);
  }

  

 


  loadRecipeData(){
    this.recService.getSingleRecipe(this.recipeId).subscribe((recipe)=>{
      this.currentRecipe = recipe;
      this.allComments = this.getComments();
      // console.log(recipe);
    })
  }

  isOwner():boolean{
    // todo implement a function that hides or shows edit/delete button on authorId and userId check
    return true
  }

 
  postComment():void{
    //TODO GET AUTHOR USERNAME AND ID AND FINISH SINGLE COMMENT INTERFACE TO SEND PARAMETERS INTO USER SERVICE
    const form = this.form!;
    const commentContent = form.value.commentContent;
    const timestamp = String(Date.now());
    const authorId = "ivancho";
    const authorUsername = "Big Ivan"
    const id = String(uuidv4());
    const comment:SingleComment = {
      authorId: authorId,
      authorUsername: authorUsername,
      content: commentContent,
      timestamp: timestamp,
      commentId: id
    }
    this.recService.createComment(comment,id,this.recipeId);
    this.allComments.push(comment);
  }

  onDeleteComment(commentId:string):void{
    this.allComments = this.allComments.filter((comment)=>comment.commentId !== commentId);
    this.recService.deleteComment(this.recipeId,commentId);
  }

  onDeleteRecipe(recipeId:string){
    this.recService.deleteRecipe(recipeId).subscribe(()=>{
      this.router.navigate(['/recipes']);
    })
    
  }


}
