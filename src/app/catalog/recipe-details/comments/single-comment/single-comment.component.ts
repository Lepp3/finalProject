import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleComment } from '../../../models/recipe.model';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent {
 @Input('singleComment') comment:SingleComment | null=null;
 @Output() deleteComment = new EventEmitter<string>();

 onDelete():void{
  if(this.comment){
    this.deleteComment.emit(this.comment.commentId);
  }
 }
}
