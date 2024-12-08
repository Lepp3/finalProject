import { Component,  OnInit,  ViewChild } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SingleComment, SingleRecipe } from '../models/recipe.model';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { SignedUser, UserInfo } from '../../user-profile/models/userModel';
import { UserService } from '../../user.service';
import { tap } from 'rxjs';



@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommentsComponent,FormsModule,RouterLink],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit{

  recipeId!:string;

  currentRecipe!:SingleRecipe | null 

  allComments:SingleComment[] = [];

  currentUser:  SignedUser | null = null;

  currentUserInfo: UserInfo | null = null;

  isOwner!: boolean;

  isLogged: boolean = false;

  hasLiked!: boolean;

  buttonAvailable!: boolean;

  @ViewChild('commentForm') form: NgForm | undefined;

  
  

  
  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.params['id'];
    if(this.recipeId){
      this.loadRecipeData();
    }
    

  }
  

  constructor(
    private recService:RecipeService,
    private activatedRoute:ActivatedRoute, 
    private router: Router,
    private userService:UserService
  ){
    this.currentUser = this.userService.user;
    this.currentUserInfo = this.userService.userInfo;
    if(this.currentUser){
      this.isLogged = true;
    }
    
  }

  getComments(): SingleComment[] {
    if (!this.currentRecipe?.comments) {
      return [];
    }
    return Object.values(this.currentRecipe.comments);
  }

  
  loadRecipeData(){
    this.recService.getSingleRecipe(this.recipeId).pipe(
      tap(recipe=>{
        this.currentRecipe = recipe;
        this.allComments = this.getComments();
        this.isOwner = this.recService.isRecipeAuthor(this.currentRecipe.authorId,this.currentUser?.localId);
        if(this.currentUser){
          if(this.currentRecipe.likes){
            if(Object.keys(this.currentRecipe.likes).includes(this.currentUser.localId)){
              this.hasLiked = true;
              this.buttonAvailable = false;
            }else{
              this.hasLiked = false;
              this.buttonAvailable = true;
            }
          }else{
            this.buttonAvailable = true;
            this.hasLiked = false;
          }
        }
      })
    ).subscribe()
  }

  

 
  postComment():void{
    const form = this.form;
    if(form?.invalid){
      console.log('invalid form')
      return 
    }
    const commentContent = form?.value.commentContent;
    const timestamp = String(Date.now());
    const authorId = this.currentUser?.localId;
    const authorUsername = this.currentUserInfo?.username;
    const id = String(uuidv4());
    const comment:SingleComment = {
      authorId: authorId!,
      authorUsername: authorUsername!,
      content: commentContent,
      timestamp: timestamp,
      commentId: id
    }
    this.recService.createComment(comment,id,this.recipeId).subscribe()
    this.allComments.push(comment);
    form?.reset();
  }

  onDeleteComment(commentId:string):void{
    this.allComments = this.allComments.filter((comment)=>comment.commentId !== commentId);
    this.recService.deleteComment(this.recipeId,commentId);
  }

  onLikeComment(event: { commentId: string; userId: string }){
    this.recService.likeComment(this.currentRecipe!.recipeId,event.commentId,event.userId)
    
  }

  onLikeRecipe(){
    this.recService.likeRecipe(this.currentRecipe!.recipeId,this.currentUser!.localId);
    this.buttonAvailable = !this.buttonAvailable;
  }

  onDeleteRecipe(recipeId:string){
    this.recService.deleteRecipe(recipeId).subscribe(()=>{
      this.router.navigate(['/recipes']);
    })
    
  }


}
