import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SingleComment } from '../../../models/recipe.model';
import { SignedUser } from '../../../../user-profile/models/userModel';
import { UserService } from '../../../../services/user.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../../../../user-profile/models/userModel';
import { tap } from 'rxjs';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [DatePipe,RouterLink],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent implements OnInit{
 @Input('singleComment') comment:SingleComment | null=null;
 @Input('isAuthor') isAuthorOfRecipe!:boolean;
 @Output() deleteComment = new EventEmitter<string>();
 @Output() likeComment = new EventEmitter<{ commentId: string; userId: string }>();
 totalLikes: number = 0;
 viewingUser: SignedUser | null;
 isAuthorOfComment!: boolean;
 hasLiked!: boolean;
 buttonAvailable: boolean = true;
 authorInfo: UserInfo | null = null;

constructor(private userService:UserService){
  this.viewingUser = this.userService.user
}

 ngOnInit(): void {
  this.loadCommentAuthor()

  if(this.comment?.likes){
    this.totalLikes = Object.keys(this.comment?.likes).length;
    if(this.viewingUser){
      if(Object.keys(this.comment?.likes).includes(this.viewingUser?.localId)){
        this.hasLiked = true;
      }else{
        this.hasLiked = false;
      }
    }
    
  }
  if(this.comment){
    this.comment.authorId === this.viewingUser?.localId ? this.isAuthorOfComment = true : this.isAuthorOfComment = false;
  }
 }

 loadCommentAuthor(){
  this.userService.getUserInfo(this.comment!.authorId).pipe(tap(userInfo=>{
    this.authorInfo = userInfo;
  })).subscribe();
 }
 onLike():void{
  if(this.comment && this.viewingUser){
    this.likeComment.emit({ commentId: this.comment.commentId, userId: this.viewingUser.localId })
  }
  this.totalLikes++;
  this.buttonAvailable = !this.buttonAvailable;
 }

 onDelete():void{
  if(this.comment){
    this.deleteComment.emit(this.comment.commentId);
  }
 }
}
