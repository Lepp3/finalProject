import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { commentLikes, SingleComment } from '../../../models/recipe.model';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent implements OnInit{
 @Input('singleComment') comment:SingleComment | null=null;
 @Output() deleteComment = new EventEmitter<string>();
 totalLikes: Number | undefined = undefined;



 ngOnInit(): void {
  if(this.comment?.commentLikes){
    this.totalLikes = Object.keys(this.comment?.commentLikes).length;
  }
 }

 onDelete():void{
  if(this.comment){
    this.deleteComment.emit(this.comment.commentId);
    console.log(this.comment);
  }
 }
}
